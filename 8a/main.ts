import path from "path";
import fs from 'fs/promises'

const main = (input: string) => {
  const treesList = input.split('\n').filter(r => r !== '')

  let visibleTrees = 0;

  treesList.forEach((treesRow: string, i: number) => {
    const trees = treesRow.split('')
    trees.forEach((tree, j) => {
      const isFirstRow = i === 0
      const isLastRow = i === treesList.length - 1
      const isFirstColumn = j === 0
      const isLastColumn = j === trees.length - 1
      if (isFirstRow || isLastRow || isFirstColumn || isLastColumn) {
        visibleTrees++
        return;
      }

      let leftTallestTree = 0
      let rightTallestTree = 0
      trees.forEach((rowTree, ii) => {
        if (ii < j) {
          if (leftTallestTree < Number(rowTree)) {
            leftTallestTree = Number(rowTree)
          }
        } else if (ii > j) {
           if (rightTallestTree < Number(rowTree)) {
            rightTallestTree = Number(rowTree)
          }
        }
      })
      let topTallestTree = 0
      let bottomTallestTree = 0
      treesList.forEach((columnTrees, jj) => {
        if (jj !== i) {
          columnTrees.split('').forEach((columnTree, jjj) => {
            if (jjj === j) {
              if (jj < i) {
                if (topTallestTree < Number(columnTree)) {
                  topTallestTree = Number(columnTree)
                }
              } else if (jj > i) {
                 if (bottomTallestTree < Number(columnTree)) {
                  bottomTallestTree = Number(columnTree)
                }
              }
            }
          })
        }
      })
      const parsedTree = Number(tree)
      if (topTallestTree < parsedTree || rightTallestTree < parsedTree || bottomTallestTree < parsedTree || leftTallestTree < parsedTree) {
        visibleTrees++
      }
    })
  })

  return visibleTrees
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
