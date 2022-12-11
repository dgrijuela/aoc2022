import path from "path";
import fs from 'fs/promises'

const cycles = [20, 60, 100, 140, 180, 220]

const main = (input: string) => {
  const instructions = input.split('\n')

  let cyclesValues: number[] = []

  instructions.forEach(instruction => {
    if (instruction === '') return;

    const lastValue = cyclesValues[cyclesValues.length - 1] || 1

    if (/noop/.test(instruction)) {
      cyclesValues.push(lastValue)
    }

    if (/addx/.test(instruction)) {
      const [, x] = instruction.split(' ')
      cyclesValues.push(lastValue)
      cyclesValues.push(lastValue + Number(x))
    }
  })

  cyclesValues.forEach((cycle, i) => {
    if (cycles.includes(i + 2)) {
      console.log(i + 2, cycle, (i + 2) * cycle)
    }
  })

  const signalStrength = cyclesValues.reduce((acc, cycle, i) => {
    if (cycles.includes(i + 2)) {
      return acc + (i + 2) * cycle
    }
    return acc
  }, 0)

  return signalStrength
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
