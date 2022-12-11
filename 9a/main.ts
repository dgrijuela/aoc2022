import path from "path";
import fs from 'fs/promises'

const getIsTailAdjacent = (tailPosition: [number, number], headPosition: [number, number]) => {
  if (Math.abs(headPosition[0] - tailPosition[0]) < 2 && Math.abs(headPosition[1] - tailPosition[1]) < 2) {
    return true
  } else {
    return false
  }
}

const moveTailCloser = (tailPosition: [number, number], headPosition: [number, number]) => {
  const isSameRow = tailPosition[1] === headPosition[1]
  const isSameColumn = tailPosition[0] === headPosition[0]
  if (isSameRow) {
    if (tailPosition[0] < headPosition[0]) {
      tailPosition[0]++
    } else {
      tailPosition[0]--
    }
  } else if (isSameColumn) {
    if (tailPosition[1] < headPosition[1]) {
      tailPosition[1]++
    } else {
      tailPosition[1]--
    }
  } else {
    if (tailPosition[0] < headPosition[0] && tailPosition[1] < headPosition[1]) {
      tailPosition[0]++
      tailPosition[1]++
    } else if (tailPosition[0] < headPosition[0] && tailPosition[1] > headPosition[1]) {
      tailPosition[0]++
      tailPosition[1]--
    } else if (tailPosition[0] > headPosition[0] && tailPosition[1] > headPosition[1]) {
      tailPosition[0]--
      tailPosition[1]--
    } else if (tailPosition[0] > headPosition[0] && tailPosition[1] < headPosition[1]) {
      tailPosition[0]--
      tailPosition[1]++
    }
  }
}

const main = (input: string) => {
  const headPosition: [number, number] = [0, 0]
  const tailPosition: [number, number] = [0, 0]
  const tailPositionsSet: Set<string> = new Set()

  const motions = input.split('\n')
  motions.forEach((motion) => {
    if (motion === '') return

    const [direction, steps] = motion.split(' ')
    new Array(Number(steps)).fill(undefined).forEach(() => {
      switch(direction) {
        case 'U':
          headPosition[1] = headPosition[1] + 1
          break;
        case 'R':
          headPosition[0] = headPosition[0] + 1
          break;
        case 'D':
          headPosition[1] = headPosition[1] - 1
          break;
        case 'L':
          headPosition[0] = headPosition[0] - 1
          break;
      }

      const isTailAdjacent = getIsTailAdjacent(tailPosition, headPosition)
      if (!isTailAdjacent) {
        moveTailCloser(tailPosition, headPosition)
      }

      tailPositionsSet.add(`${tailPosition[0]}.${tailPosition[1]}`)
    })
  })

  return tailPositionsSet.size
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
