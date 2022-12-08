import path from "path";
import fs from 'fs/promises'

const main = (input: string) => {
  const treesList = input.split('\n').filter(r => r !== '')

  let highestScenicScore = 0;

  treesList.forEach((treesRow: string, i: number) => {
    const trees = treesRow.split('')
    trees.forEach((tree, j) => {
      const scores: number[] = [0, 0, 0, 0]
      const parsedTree = Number(tree)

      for(let x = j - 1; x >= 0; x--) {
        scores[0]++
        if (Number(trees[x]) >= parsedTree) {
          break;
        }
      }

      for(let x = j + 1; x < trees.length; x++) {
        scores[1]++
        if (Number(trees[x]) >= parsedTree) {
          break;
        }
      }

      for(let x = i - 1; x >= 0; x--) {
        scores[2]++
        if (Number(treesList[x].split('')[j]) >= parsedTree) {
          break;
        }
      }

      for(let x = i + 1; x < treesList.length; x++) {
        scores[3]++
        if (Number(treesList[x].split('')[j]) >= parsedTree) {
          break;
        }
      }

      const scenicScore = scores.reduce((acc, points) => {
        if (acc !== 0 && points !== 0) {
          return acc * points
        }
        if (acc === 0 && points !== 0) {
          return points
        }
        return acc
      }, 0)

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore
      }
    })
  })

  return highestScenicScore
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '8a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
