import path from "path";
import fs from 'fs/promises'

const lowercaseItemsList = 'abcdefghijklmnopqrstuvwxyz'.split('')
const itemsList = [...lowercaseItemsList]
lowercaseItemsList.forEach(item => {
  itemsList.push(item.toUpperCase())
})

const getItemPriority = (item: string) => {
  return itemsList.indexOf(item) + 1
}

const main = (input: string) => {
  const inputPerLine = input.split('\n')
  let totalPriorities = 0

  const numberOfGroups = Math.floor(inputPerLine.length / 3)
  new Array(numberOfGroups).fill(undefined).forEach((_, i) => {
    const startIndex = 3 * i
    const endIndex = startIndex + 3
    const [firstRucksack, secondRucksack, thirdRucksack] = inputPerLine.slice(startIndex, endIndex)
    const firstRuckSackItems = new Set(firstRucksack.split(''))
    const secondRuckSackItems = new Set(secondRucksack.split(''))
    const thirdRuckSackItems = new Set(thirdRucksack.split(''))
    const groupItems = [...firstRuckSackItems, ...secondRuckSackItems, ...thirdRuckSackItems].join('').split('')
    const itemsRepetition = new Map<string, number>()
    let badge: string = ''
    groupItems.some(item => {
      const value = itemsRepetition.get(item) || 0
      const newValue = value + 1
      if (newValue === 3) {
        badge = item
        return true
      }
      itemsRepetition.set(item, newValue)
    })
    const badgePriority = getItemPriority(badge)
    totalPriorities += badgePriority
 })

 return totalPriorities
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '3a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
