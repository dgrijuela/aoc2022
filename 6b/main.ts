import path from "path";
import fs from 'fs/promises'

const main = (input: string) => {
  let markerIndex: number = 0
  const charList = input.split('')
  try {
    charList.forEach((_, i) => {
      if (i < 13) return;
      let charSet: Set<string> = new Set
      new Array(14).fill(undefined).forEach((_, j) => {
        charSet.add(charList[i - j])
      })
      if (charSet.size === 14) {
        markerIndex = i + 1
        throw new Error()
      }
    })
  } catch(err) {}
  return markerIndex
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, '..', '6a', 'input.txt'), 'utf8')
  console.time('exec')
  const result = main(input)
  console.timeEnd('exec')
  console.log(result)
})()
