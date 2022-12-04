import path from "path";
import fs from 'fs/promises'

const generateIdList = (start: number, end: number) => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => start + i)
}

const areListsContainedWithinEachOther = (listA: number[], listB: number[]) => {
  let overlaps = false
  listA.forEach(itemA => {
    if (listB.indexOf(itemA) !== -1) {
      overlaps = true
    }
  })
  return overlaps
}

const main = (input: string) => {
  const inputPerLine = input.split('\n')
  let pairsContainedWithinEachOther = 0
  inputPerLine.forEach(line => {
    if (line === '') return
    const [firstElf, secondElf] = line.split(',')
    const [firstElfStartingId, firstElfEndingId] = firstElf.split('-')
    const [secondElfStartingId, secondElfEndingId] = secondElf.split('-')
    const firstElfIds = generateIdList(Number(firstElfStartingId), Number(firstElfEndingId))
    const secondElfIds = generateIdList(Number(secondElfStartingId), Number(secondElfEndingId))
    const firstContainedWithinSecond = areListsContainedWithinEachOther(firstElfIds, secondElfIds)
    const secondContainedWithinFirst = areListsContainedWithinEachOther(secondElfIds, firstElfIds)
    if (firstContainedWithinSecond || secondContainedWithinFirst) {
      pairsContainedWithinEachOther++
    }
  })
  return pairsContainedWithinEachOther
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '4a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
