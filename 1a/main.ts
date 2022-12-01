import path from "path";
import fs from 'fs/promises'

const main = (caloriesList: string) => {
  const caloriesByElf: Record<number, number> = {}

  const caloriesListSplitted = caloriesList.split('\n')

  let currentElf = 1

  caloriesListSplitted.forEach(calories => {
    const currentElfCalories = caloriesByElf[currentElf] || 0

    if (!calories && !currentElfCalories) return

    if (calories) {
      const caloriesParsed = Number(calories)
      caloriesByElf[currentElf] = currentElfCalories + caloriesParsed
    } else {
      currentElf++
    }
  })

  let maxCalories = 0

  Object.values(caloriesByElf).forEach(calories => {
    if (calories > maxCalories) {
      maxCalories = calories
    }
  })

  return maxCalories
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
