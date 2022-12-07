import path from "path";
import fs from 'fs/promises'

const TOTAL_AVAILABLE = 70000000
const UPDATE_SPACE = 30000000

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

  const totalUsedSpace = directoriesSizeMap['./']
  const availableSpace = TOTAL_AVAILABLE - totalUsedSpace
  const neededSpace = UPDATE_SPACE - availableSpace

  let nearestGreaterDirSize = 0
  Object.values(directoriesSizeMap).forEach(size => {
    const extraSpace = size - neededSpace
    if (extraSpace > 0) {
      if (nearestGreaterDirSize) {
        if (nearestGreaterDirSize > size) {
          nearestGreaterDirSize = size
        }
      } else {
        nearestGreaterDirSize = size
      }
    }
  })

  return nearestGreaterDirSize
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '7a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
