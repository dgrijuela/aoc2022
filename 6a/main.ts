import path from "path";
import fs from 'fs/promises'

const main = (input: string) => {
  let markerIndex: number = 0
  const charList = input.split('')
  try {
    charList.forEach((char, i) => {
      if (i < 3) return;
      const charSet = new Set([charList[i - 3], charList[i - 2], charList[i - 1], char])
      if (charSet.size === 4) {
        markerIndex = i + 1
        throw new Error()
      }
    })
  } catch(err) {}
  return markerIndex
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
