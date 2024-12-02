export function isNumber(char) {
    return char.match(/[0-9]/)
}

export function isSymbol(char) {
    return char !== "." && !isNumber(char)
}

export function getAdjacentNumbers(scheme, symbol) {
    const sx = symbol.x;
    const sy = symbol.y;
    return scheme.numbers.filter(number => {
        const nx = number.x;
        const ny = number.y;
        const length = number.length;

        return sx >= nx - 1 && sx < nx + length + 1 &&
               sy >= ny - 1 && sy < ny + 1 + 1
    })
}

export function hasAdjacentSymbol(scheme, {x, y, length}) {
    let adjacentCount = 0;
    for(let iy = 0; iy < 3; iy++) {
        for(let ix = 0; ix < length + 2; ix++) {
            const char = scheme.get(x - 1 + ix, y - 1 + iy)
            if (char !== "." && !char.match(/[0-9]/)) {
                adjacentCount++;
            }
        }
    }
    return adjacentCount;
}

export function getGears(scheme) {
    let ratio = 0;
    const gears = scheme.symbols.filter(symbol => {
        if (symbol.symbol !== "*") return false;
        const adjacentNumbers = getAdjacentNumbers(scheme, symbol)
        if (adjacentNumbers.length != 2) return false;
        ratio += adjacentNumbers[0].number * adjacentNumbers[1].number;
        return true;
    })
    gears.ratio = ratio;
    return gears;
}

export function parseSchematic(schematicText) {
    const scheme = {}

    scheme._data = []

    const lines = schematicText.split("\n").map(e => e.trim())
    const width = lines[0].length;
    function coord(x, y) {
        return y * width +  x;
    }

    scheme.symbols = []
    lines.forEach((line, lineIndex) => {
        for(let charIndex in line) {
            const char = line[charIndex];
            charIndex = Number.parseInt(charIndex)
            scheme._data[coord(charIndex, lineIndex)] = line[charIndex]
            if(isSymbol(char)) {
                scheme.symbols.push({symbol: char, x: charIndex, y: lineIndex})
            }
        }
    });
    scheme.get = (x, y) => {
        if(x < 0 || y < 0) return "."
        if(x >= width || y >= width) return "."
        return scheme._data[coord(x, y)]
    }
    
    scheme.numbers = []
    lines.forEach((line, lineIndex) => {
        let last = line[0];
        let lastIsNumber = isNumber(last)
        for (let i = 1; i < line.length+1; i++) {
            const char = scheme.get(i, lineIndex)
            if (!lastIsNumber) {
                last = char;
                lastIsNumber = isNumber(char)
            } else if (isNumber(char)){
                last += char
            } else {
                const number = Number.parseInt(last)
                const numberEntry = {number, length: last.length, x: i - last.length, y: lineIndex};
                numberEntry.adjacent = hasAdjacentSymbol(scheme, numberEntry)
                scheme.numbers.push(numberEntry)
                last = char;
                lastIsNumber = false
            }
        }
    })

    scheme.sum = scheme.numbers
        .filter(e => e.adjacent)
        .reduce((agg, cur) => agg + cur.number, 0)

    return scheme;
}

import fs from 'fs'
function star1() {
    const input = fs.readFileSync('./day-3/input.txt', 'utf8');
    const scheme = parseSchematic(input);
    console.log(scheme.sum)
}

function star2() {
    const input = fs.readFileSync('./day-3/input.txt', 'utf8');
    const scheme = parseSchematic(input);
    const gears = getGears(scheme)
    console.log(gears.ratio)

}

star2()