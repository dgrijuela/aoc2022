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

  const caloriesSorted = Object.values(caloriesByElf).sort((a, b) => b - a)

  const [firstTopCalories, secondTopCalories, thirdTopCalories] = caloriesSorted

  const topThreeCalories = firstTopCalories + secondTopCalories + thirdTopCalories
  return topThreeCalories
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '1a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
