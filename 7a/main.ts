import path from "path";
import fs from 'fs/promises'

const MAX_AMOUNT = 100000

const main = (input: string) => {
  let currentDir = ''
  let parentDir = ''
  const directoriesSizeMap: Record<string, number> = {}

  const commandList = input.split('\n')

  commandList.forEach(command => {
    if (command === '') return

    const isCdCommand = /\$ cd/.test(command)
    const isLsCommand = /\$ ls/.test(command)
    const isDirCommand = /dir/.test(command)


    if (isCdCommand) {
      const newDir = command.replace('$ cd ', '')
      if (newDir === '..') {
        currentDir = parentDir
        parentDir = parentDir.split('.').slice(0, -1).join('.')
      } else {
        parentDir = currentDir
        currentDir = parentDir ? `${parentDir}.${newDir}` : newDir
      }
    } else if (!isLsCommand && !isDirCommand) {
      const [size] = command.split(' ')

      const fileSystemPathList = currentDir.split('.')

      fileSystemPathList.reduce((acc, path) => {
        const newPath = `${acc}.${path}`
        directoriesSizeMap[newPath] = (directoriesSizeMap[newPath] || 0) + Number(size)
        return newPath
      }, '')
    }
  })

  const lessThanMaxSize = Object.values(directoriesSizeMap).filter((size) => size <= MAX_AMOUNT)
  return lessThanMaxSize.reduce((acc, size) => acc + size, 0)
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
