import fetch from 'node-fetch'
import fs from 'fs'

async function getFromReadme() {
  const res = await fetch('https://www.netlib.org/lp/data/readme')
  const data = await res.text()

  const idx0 = data.indexOf('      PROBLEM SUMMARY TABLE')
  const idx1 = data.indexOf('      BOUND-TYPE TABLE', idx0)
  const problemSummary = data.slice(idx0 + 21, idx1).trim()

  const re = /([\w\.-]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+|\(see NOTES\))\s+(B?R?)\s+([+-.\dE]+)/g
  return Array.from(problemSummary.matchAll(re), m => {
    const [name, rows, cols, nzs, bytes, br, value] = m.slice(1, 8)
    return {
      name: name.toLowerCase(),
      rows: Number.parseInt(rows),
      cols: Number.parseInt(cols),
      nzs: Number.parseInt(nzs),
      bytes: Number.parseInt(bytes),
      br,
      value: Number.parseFloat(value),
    }
  })
}

async function downloadAllFiles(summary) {
  for (let inst of summary) {
    console.log('Loading ' + inst.name)
    const res = await fetch('https://www.netlib.org/lp/data/' + inst.name)
    if (res.status !== 200) {
      console.log('...fail')
      continue
    }
    const data = await res.text()
    await fs.promises.writeFile('./data/raw/' + inst.name, data)
  }
}

getFromReadme().then(async r => {
  await fs.promises.writeFile('./data/summary.json', JSON.stringify(r))
  await downloadAllFiles(r)
})
