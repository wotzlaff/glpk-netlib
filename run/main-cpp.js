import fs from 'fs'
import path from 'path'
import { basename } from 'path'
import { execFileSync } from 'child_process'

const files = fs.readdirSync('./data/mps')
for (let file of files) {
  const data = execFileSync('./src/solve', [path.join('./data/mps', file)], { encoding: 'utf8' })
  const [value, time] = data.trim().split('\t')
  const name = basename(file).slice(0, -4)
  console.log(`${name}\t${value}\t${time}`)
}
