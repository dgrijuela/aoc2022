const path = require("path")
const fs = require('fs/promises')

function part1(input) {
  const lines = input.split('\n');
  let sum = 0;
  let cycle = 0;
  let x = 1;
  function progress() {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      sum += x * cycle;
    }
  }
  for (const line of lines) {
    if (line === 'noop') progress();
    else {
      progress();
      progress();
      x += +line.split(' ').pop();
    }
  }
  return sum;
}

const alphabet = {
  '.##.#..##..######..##..#': 'A',
  '###.#..####.#..##..####.': 'B',
  '.##.#..##...#...#..#.##.': 'C',
  '#####...###.#...#...####': 'E',
  '#####...###.#...#...#...': 'F',
  '.##.#..##...#.###..#.###': 'G',
  '#..##..######..##..##..#': 'H',
  '.###..#...#...#...#..###': 'I',
  '..##...#...#...##..#.##.': 'J',
  '#..##.#.##..#.#.#.#.#..#': 'K',
  '#...#...#...#...#...####': 'L',
  '.##.#..##..##..##..#.##.': 'O',
  '###.#..##..####.#...#...': 'P',
  '###.#..##..####.#.#.#..#': 'R',
  '.####...#....##....####.': 'S',
  '#..##..##..##..##..#.##.': 'U',
  '#...#....#.#..#...#...#.': 'Y',
  '####...#..#..#..#...####': 'Z',
  '..##...#..#.#....##....##....########....##....##....##....#': 'A',
  '#####.#....##....##....######.#....##....##....##....######.': 'B',
  '.####.#....##.....#.....#.....#.....#.....#.....#....#.####.': 'C',
  '#######.....#.....#.....#####.#.....#.....#.....#.....######': 'E',
  '#######.....#.....#.....#####.#.....#.....#.....#.....#.....': 'F',
  '.####.#....##.....#.....#.....#..####....##....##...##.###.#': 'G',
  '#....##....##....##....########....##....##....##....##....#': 'H',
  '...###....#.....#.....#.....#.....#.....#.#...#.#...#..###..': 'J',
  '#....##...#.#..#..#.#...##....##....#.#...#..#..#...#.#....#': 'K',
  '#.....#.....#.....#.....#.....#.....#.....#.....#.....######': 'L',
  '#....###...###...##.#..##.#..##..#.##..#.##...###...###....#': 'N',
  '#####.#....##....##....######.#.....#.....#.....#.....#.....': 'P',
  '#####.#....##....##....######.#..#..#...#.#...#.#....##....#': 'R',
  '#....##....#.#..#..#..#...##....##...#..#..#..#.#....##....#': 'X',
  '######.....#.....#....#....#....#....#....#.....#.....######': 'Z',
};

function ocr(image) {
  let lines = image.trim().split('\n');
  const width = lines.length === 6 ? 4 : 6;
  const spaces = lines.length === 6 ? 1 : 2;
  let result = '';
  if (lines.length === 6 && lines[0].length % 5 !== 0) {
    lines = lines.map(x => x.replace(/^\./, ''));
  }
  const letters = Math.ceil(lines[0].length / (width + spaces));
  for (let i = 0; i < letters; i++) {
    const letter = lines.map(x => x.substr(i * (width + spaces), width));
    result += alphabet[letter.join('')];
  }
  return result.length === letters ? result : `\n${image.trim()}`;
}

function part2(input) {
  const lines = input.split('\n');
  let result = '';
  let cycle = 0;
  let x = 1;
  function progress() {
    if (cycle % 40 === 0) result += '\n';
    result += Math.abs((cycle % 40) - x) <= 1 ? '#' : '.';
    cycle++;
  }
  for (const line of lines) {
    if (line === 'noop') progress();
    else {
      progress();
      progress();
      x += +line.split(' ').pop();
    }
  }
  return ocr(result);
}

(async() => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  console.time('exec')
  const result1 = part1(input)
  const result2 = part2(input)
  console.timeEnd('exec')
  console.log(result1)
  console.log(result2)
})()
