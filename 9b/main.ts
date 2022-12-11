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
  const knotsPositions: [number, number][] = new Array(10).fill(undefined).map(() => [0, 0])
  const tailPositionsSet: Set<string> = new Set()

  const motions = input.split('\n')
  const grid = new Array(50).fill(undefined).map(() => {
    return new Array(50).fill('.')
  })

  motions.forEach((motion) => {
    if (motion === '') return

    const [direction, steps] = motion.split(' ')
    new Array(Number(steps)).fill(undefined).forEach((_, n) => {
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

      console.log('2 headPosition', headPosition)
      knotsPositions.forEach((knot, i) => {
        const previousKnot = knotsPositions[i - 1] || headPosition
        const isKnotAdjacent = getIsTailAdjacent(knot, previousKnot)
        if (!isKnotAdjacent) {
          moveTailCloser(knot, previousKnot)
        }
        console.log(i + 1 === 10 ? 'S' : i + 1, {knot, previousKnot}, getIsTailAdjacent(knot, previousKnot))
      })

      console.log(`${motion} (${n + 1})`)
      grid.forEach((row, i) => {
        const mappedRow = row.map((column, j) => {
          let columnString = ''
          if (headPosition[0] + 24 === j && headPosition[1] === 24 - i) {
            columnString += `H`
          }
          const matchingKnots = knotsPositions.reduce((acc, knot, ii) => {
            if (knot[0] + 24 === j && knot[1] === 24 - i) {
              return acc + `${ii + 1}`
            } else {
              return acc
            }
          }, '')
          if (matchingKnots.length) {
            columnString += matchingKnots
          }
          if (columnString === '') {
            columnString += column
          }
          return columnString
        })
        console.log(mappedRow.join(''))
      })

      tailPositionsSet.add(`${knotsPositions[knotsPositions.length - 1][0]}.${knotsPositions[knotsPositions.length - 1][1]}`)
    })
  })

  //console.log(tailPositionsSet)
  //grid.forEach((row, i) => {
  //  const mappedRow = row.map((column, j) => {
  //    if (tailPositionsSet.has(`${j - 24}.${24 - i}`)) {
  //      return `X`
  //    }
  //    return column
  //  })
  //  console.log(mappedRow.join(''))
  //})

  return tailPositionsSet.size
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '9a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
