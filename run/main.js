import fs from 'fs'
import path from 'path'
import { loadModule, Model } from 'glpk-ts'

loadModule().then(mod => {
  mod._glp_term_out(0)
  const files = fs.readdirSync('./data/mps')
  for (let file of files) {
    const data = fs.readFileSync(path.join('./data/mps', file))
    const m = Model.fromMPS(data, 'deck')
    const t0 = process.hrtime.bigint()
    m.simplex({ msgLevel: 'off' })
    const dt = process.hrtime.bigint() - t0
    const ms = Number.parseFloat(
      [
        (dt / 1000000n).toString().slice(0, -1),
        (dt % 1000000n).toString().slice(0, -1).padStart(6, '0'),
      ].join('.')
    )
    const name = file.slice(0, -4)
    console.log(`${name}\t${m.value}\t${ms}`)
  }
})
