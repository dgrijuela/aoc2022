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
  inputPerLine.forEach(line => {
    const half = line.length / 2
    const firstCompartment = line.slice(0, half)
    const secondCompartment = line.slice(half, line.length)
    const repeatedItems: string[] = []
    const firstCompartmentItems = firstCompartment.split('')
    const secondCompartmentItems = secondCompartment.split('')
    const firstCompartmentUniqueItems = new Set(firstCompartmentItems)
    const secondCompartmentUniqueItems = new Set(secondCompartmentItems)
    firstCompartmentUniqueItems.forEach(item => {
      if (secondCompartmentUniqueItems.has(item)) {
        repeatedItems.push(item)
      }
    })
    const priorities = repeatedItems.reduce((acc, item) => acc + getItemPriority(item), 0)
    totalPriorities += priorities
  })
  return totalPriorities
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
