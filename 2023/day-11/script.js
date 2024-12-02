import fs from 'fs'

export function findUniverses(input) {
    const universes = []
    const lines = input.split("\n")
    
    lines.forEach((line, y) => {
        line.split("").forEach((char, x) => {
            if(char == "#") {
                universes.push({x, y})
            }
        })
    })
    
    return universes;
}

export function findEmptyRows(input) {
    const lines = input.split("\n")
    const empty = []
    for (let i = 0; i < lines.length; i++) {
        if(lines[i].indexOf("#") == -1) {
            empty.push(i)
        }
    }
    return empty;
}

export function findEmptyCols(input) {
    const lines = input.split("\n")
    const empty = []
    for (let x = 0; x < lines[0].length; x++) {
        let transposedLine = "";
        for(let y = 0; y < lines.length; y++) {
            transposedLine += lines[y][x]
        }
        if(transposedLine.indexOf("#") == -1) empty.push(x)
    }
    return empty;
}

export function calculateDistance(a, b, emptyRows, emptyCols, emptyDistance) {
    const startX = Math.min(a.x, b.x)
    const endX = Math.max(a.x, b.x)

    const startY = Math.min(a.y, b.y)
    const endY = Math.max(a.y, b.y)

    let distance = (endX - startX) + (endY - startY);
    emptyCols.forEach(col => {
        if (col > startX && col < endX) distance += emptyDistance-1
    })
    emptyRows.forEach(row => {
        if (row > startY && row < endY) distance += emptyDistance-1
    })
    return distance
}