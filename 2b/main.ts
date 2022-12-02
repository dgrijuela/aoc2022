import path from "path";
import fs from 'fs/promises'

type OpponentMove = 'A' | 'B' | 'C'
type MyMove =  'X' | 'Y' | 'Z'
type Result =  'X' | 'Y' | 'Z'

const scoreByMove: Record<MyMove, number> = {
  X: 1,
  Y: 2,
  Z: 3,
}

const scoreByResult: Record<Result, number> = {
  X: 0,
  Y: 3,
  Z: 6,
}

const moveMap: Record<OpponentMove, Record<Result, MyMove>> = {
  'A': {
    'X': 'Z',
    'Y': 'X',
    'Z': 'Y',
  },
  'B': {
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
  },
  'C': {
    'X': 'Y',
    'Y': 'Z',
    'Z': 'X',
  },
}

const getScore = (opponentMove: OpponentMove, result: Result) => {
  if (!opponentMove || !result) return 0
  const myMove = moveMap[opponentMove][result]
  const resultScore = scoreByResult[result]
  const moveScore = scoreByMove[myMove]
  return resultScore + moveScore
}

const main = (input: string) => {
  const inputPerLine = input.split('\n')
  let totalScore = 0
  inputPerLine.forEach(line => {
    const [player1, player2] = line.split(' ') as [OpponentMove, Result]
    totalScore += getScore(player1, player2)
  })
  return totalScore
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '2a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
