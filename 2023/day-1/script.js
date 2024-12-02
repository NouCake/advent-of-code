import fs from 'fs';

const spelledNumbers = [
    { text: "one", value: 1},
    { text: "two", value: 2},
    { text: "three", value: 3},
    { text: "four", value: 4},
    { text: "five", value: 5},
    { text: "six", value: 6},
    { text: "seven", value: 7},
    { text: "eight", value: 8},
    { text: "nine", value: 9},
]

export function findSpelledNumbers(line) {
    return spelledNumbers
        .map(e => {
            let searchLine = line;
            const spelled = []
            let index;
            do {
                index = searchLine.indexOf(e.text);
                if (index !== -1) index += line.length - searchLine.length
                searchLine = searchLine.substring(index + 1);
                spelled.push(Object.assign({}, e, {index: index}))
            } while (index !== -1)
            return spelled
        })
        .flat()
        .sort((a, b) => a.index-b.index)
        .filter(e => e.index !== -1)
}

export function replaceSpelledNumber(line, {text, value, index}) {
    return line.substring(0, index) + value + line.substring(index + text.length)
}

export function findFirstNumber(line) {
    let numberIndexes = findSpelledNumbers(line);

    if (numberIndexes.length > 0 ) {
        const first = numberIndexes[0]
        line = replaceSpelledNumber(line, first);
    }

    let groups = line.match(/([0-9])/g); 
    if (!groups) return 0; 
    return groups[0];
}

export function findLastNumber(line) {
    let numberIndexes = findSpelledNumbers(line);

    if (numberIndexes.length > 0 ) {
        const first = numberIndexes[numberIndexes.length-1]
        line = replaceSpelledNumber(line, first);
    }

    let groups = line.match(/([0-9])/g); 
    if (!groups) return 0; 
    return groups[groups.length-1];
}


export default function run () {
    const input = fs.readFileSync('./day-1/input.txt', 'utf8');
    const lines = input.split('\n');

    const parsedLines = lines
        .map(line =>  findFirstNumber(line) + findLastNumber(line))

    fs.writeFileSync("./day-1/output.txt", parsedLines.map((e, i) => e + "|" + lines[i] ).join("\n"))

    const sum = parsedLines
        .reduce(
            (acc, cur) => Number.parseInt(cur) + acc,
            0
        );

    console.log(sum);
}

run()