import glob from 'glob-promise'
import fs from 'fs'
import { basename } from 'path'
import { promisify } from 'util'
import { execFile as execFileCb } from 'child_process'

const execFile = promisify(execFileCb)

async function main() {
  const files = await glob('../data/raw/*')

  for (let file of files) {
    const { stdout: mps } = await execFile('../src/emps', [file], { maxBuffer: 1024 * 1024 * 1024 })
    const name = basename(file)
    await fs.promises.writeFile(`../data/mps/${name}.mps`, mps)
  }
}

main()
