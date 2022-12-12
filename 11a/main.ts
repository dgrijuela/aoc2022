import path from "path";
import fs from 'fs/promises'

const main = (input: string) => {
  const motions = input.split('\n')
  return motions.length
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
