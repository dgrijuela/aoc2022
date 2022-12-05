import path from "path";
import fs from 'fs/promises'

const generateCratesList = (cratesLines: string) => {
  const cratesList: string[][] = []
  cratesLines.split('\n').forEach(crateLine => {
      const cratesItems = crateLine.split('')
      cratesItems.forEach((crateItem, i) => {
        if (Number(i) % 4 === 1 && /[a-zA-Z]/.test(crateItem)) {
          const crateBucket = Math.floor(i / 4)
          if(cratesList[crateBucket]) {
            cratesList[crateBucket].push(crateItem)
          } else {
            cratesList[crateBucket] = [crateItem]
          }
        }
      })
  })
  return cratesList
}

const moveCrates = (cratesList: string[][], moveLines: string) => {
  const movedCratesList = [...cratesList]
  moveLines.split('\n').forEach(moveLine => {
    if (moveLine === '') return
    const match = moveLine.match(/move (\d+) from (\d+) to (\d+)/) || []
    if (match.length) {
      const [_, qty, from, to] = match
      new Array(Number(qty)).fill(undefined).forEach(() => {
        const crateToMove = movedCratesList[Number(from) - 1].shift()
        if (crateToMove) {
          movedCratesList[Number(to) - 1].unshift(crateToMove)
        }
      })
    }
  })
  return movedCratesList
}

const main = (input: string) => {
  const [cratesLines, moveLines] = input.split('\n\n')
  const cratesList = generateCratesList(cratesLines)
  const movedCratesList = moveCrates(cratesList, moveLines)
  const topCratesList = movedCratesList.reduce((acc, crates) => acc += crates[0], '')
  return topCratesList
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
