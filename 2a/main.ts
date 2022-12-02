import path from "path";
import fs from 'fs/promises'

type OpponentMove = 'A' | 'B' | 'C'
type MyMove =  'X' | 'Y' | 'Z'
type Result = 'LOST' | 'DRAW' | 'WIN'

const scoreByMove: Record<MyMove, number> = {
  X: 1,
  Y: 2,
  Z: 3,
}

const scoreByResult: Record<Result, number> = {
  'LOST': 0,
  'DRAW': 3,
  'WIN': 6,
}

const resultMap: Record<OpponentMove, Record<MyMove, Result>> = {
  'A': {
    'X': 'DRAW',
    'Y': 'WIN',
    'Z': 'LOST',
  },
  'B': {
    'X': 'LOST',
    'Y': 'DRAW',
    'Z': 'WIN',
  },
  'C': {
    'X': 'WIN',
    'Y': 'LOST',
    'Z': 'DRAW',
  },
}

const getScore = (opponentMove: OpponentMove, myMove: MyMove) => {
  if (!opponentMove || !myMove) return 0
  const result = resultMap[opponentMove][myMove]
  const resultScore = scoreByResult[result]
  const moveScore = scoreByMove[myMove]
  return resultScore + moveScore
}

const main = (input: string) => {
  const inputPerLine = input.split('\n')
  let totalScore = 0
  inputPerLine.forEach(line => {
    const [player1, player2] = line.split(' ') as [OpponentMove, MyMove]
    totalScore += getScore(player1, player2)
  })
  return totalScore
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
