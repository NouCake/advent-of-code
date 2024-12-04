import { get } from "../../2023/day-10/script";


export function parseInput(input) {
    return input.split("\n");
}

function getChar(puzzle, x, y) {
    if (x < 0 || y < 0 || y >= puzzle.length || x >= puzzle[0].length) {
        return "";
    }
    return puzzle[y][x];
}

export function transposePuzzle(puzzle) {
    return puzzle[0].split("").map((_, i) => puzzle.map(row => row[i]).join(""));
}

export function reversePuzzle(puzzle) {
    return puzzle.map(row => row.split("").reverse().join(""));
}

export function findHorizontal(puzzle) {
    const width = puzzle[0].length;
    const height = puzzle.length;

    let count = 0;
    for(let y = 0; y < height; y++) {
        const line = puzzle[y];
        for(let x = 0; x < width - 3; x++) {
            if (line.substring(x, x+4) == "XMAS") {
                count++;
            }
        }
    }
    return count;
}

export function findDiagonal(puzzle) {
    const width = puzzle[0].length;
    const height = puzzle.length;
    
    let count = 0;
    for(let y = 0; y < height - 3; y++) {
        for(let x = 0; x < width - 3; x++) {
            //console.log("checking", x, y, ":", getChar(puzzle, x, y) + getChar(puzzle, x+1, y+1) + getChar(puzzle, x+2, y+2) + getChar(puzzle, x+3, y+3));
            if (getChar(puzzle, x, y) == "X" &&
                getChar(puzzle, x+1, y+1) == "M" &&
                getChar(puzzle, x+2, y+2) == "A" &&
                getChar(puzzle, x+3, y+3) == "S") {
                count++;
            }

            if (getChar(puzzle, width-1-x,   height-1-y) == "X" &&
                getChar(puzzle, width-1-x-1, height-1-y-1) == "M" &&
                getChar(puzzle, width-1-x-2, height-1-y-2) == "A" &&
                getChar(puzzle, width-1-x-3, height-1-y-3) == "S") {
                count++;
            }
        }
    }
    return count;
}

export function findXMas(puzzle) {
    const width = puzzle[0].length;
    const height = puzzle.length;

    let count = 0;
    for (let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            if (getChar(puzzle, x, y) != "A") {
                continue;
            }
            const leftDiagonal = getChar(puzzle, x-1, y-1) + "A" + getChar(puzzle, x+1, y+1);
            const rightDiagonal = getChar(puzzle, x+1, y-1) + "A" + getChar(puzzle, x-1, y+1);

            const left = leftDiagonal == "MAS" || leftDiagonal.split("").reverse().join("") == "MAS";
            const right = rightDiagonal == "MAS" || rightDiagonal.split("").reverse().join("") == "MAS";
            if (left && right) {
                count++;
            }
        }
    }
    return count;
}