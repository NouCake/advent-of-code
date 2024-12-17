export function parseInput(input, large = false) {
    const blocks = input.split('\n\n');

    const map = parseMap(blocks[0]);
    if(large) map.large = true;
    const instructions = parseInstructions(blocks[1]);
    return {map, instructions};
}

export function sizeUpInput(input) {
    return input
        .replaceAll("#", "##")
        .replaceAll("O", "[]")
        .replaceAll(".", "..")
        .replaceAll("@", "@.");
}

export function doInstructionLarge(map, instruction) {
    if (isWall(map, map.robot.x + instruction.x, map.robot.y + instruction.y)) {
        return;
    }
    const next = isBoxLarge(map, map.robot.x + instruction.x, map.robot.y + instruction.y);
    if(next) {
        if(!tryMoveBoxLarge(map, next, instruction)) {
            return;
        }
    }
    map.robot.x += instruction.x;
    map.robot.y += instruction.y;
}

export function doInstruction(map, instruction) {
    if (isWall(map, map.robot.x + instruction.x, map.robot.y + instruction.y)) {
        return;
    }
    const next = isBox(map, map.robot.x + instruction.x, map.robot.y + instruction.y);
    if(next) {
        if(!tryMoveBox(map, next, instruction)) {
            return;
        }
    }
    map.robot.x += instruction.x;
    map.robot.y += instruction.y;
}

export function tryMoveBox(map, box, direction) {
    if(isWall(map, box.x + direction.x, box.y + direction.y)) {
        return false;
    }
    
    const next = isBox(map, box.x + direction.x, box.y + direction.y);
    if(next) {
        if(!tryMoveBox(map, next, direction)) {
            return false;
        }
    }

    box.x += direction.x;
    box.y += direction.y;
    return true;
}

export function tryMoveBoxLarge(map, box, direction) {
    if( isWall(map, box.x   + direction.x, box.y + direction.y) ||
        isWall(map, box.x+1 + direction.x, box.y + direction.y) ) {
        return false;
    }

    const next = [
        isBoxLarge(map, box.x   + direction.x, box.y + direction.y),
        isBoxLarge(map, box.x+1 + direction.x, box.y + direction.y)
    ];

    const boxesDeepCopy = JSON.parse(JSON.stringify(map.boxes));
    if(next[0] && next[0] != box) {
        if(!tryMoveBoxLarge(map, next[0], direction)) {
            return false;
        }
    }
    if(next[1] && next[1] != box && next[1] != next[0]) {
        if(!tryMoveBoxLarge(map, next[1], direction)) {
            map.boxes = boxesDeepCopy;
            return false;
        }
    }

    box.x += direction.x;
    box.y += direction.y;
    return true;
}

export function isBox(map, x, y) {
    return map.boxes.find(b => b.x == x && b.y == y);
}

export function isBoxLarge(map, x, y) {
    return map.boxes.find(b => b.x == x && b.y == y) || map.boxes.find(b => b.x+1 == x && b.y == y);
}

export function isWall(map, x, y) {
    return map.walls.find(w => w.x == x && w.y == y);
}

function parseInstructions(instructionBlock) {
    return instructionBlock.split('\n').join("").split("").map(char => {
        switch(char) {
            case "^": return {x: 0, y: -1};
            case "v": return {x: 0, y: 1};
            case "<": return {x: -1, y: 0};
            case ">": return {x: 1, y: 0};
            default: throw new Error("Invalid instruction: " + char);
        }
    });
}

export function printMap(map, line = "") {
    const maxX = Math.max(...map.walls.map(b => b.x));
    const maxY = Math.max(...map.walls.map(b => b.y));
    for(let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            if(map.robot.x == x && map.robot.y == y) {
                line += "@";
            } else if(map.large && map.boxes.find(b => b.x == x && b.y == y)) {
                line += "[";
            } else if(map.large && map.boxes.find(b => b.x+1 == x && b.y == y)) {
                line += "]";
            } else if(map.boxes.find(b => b.x == x && b.y == y)) {
                line += "O";
            } else if(map.walls.find(w => w.x == x && w.y == y)) {
                line += "#";
            } else {
                line += ".";
            }
        }
        line += "\n";
    }
    console.log(line);
}

function parseMap(mapBlock) {
    const lines = mapBlock.split('\n').map(l => l.split(""));
    const map = {
        boxes: [],
        walls: []
    };
    for (let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if(char == "@") {
                map.robot = {x, y};
            }
            if(char == "O" || char == "[") {
                map.boxes.push({x, y});
            }
            if(char == "#") {
                map.walls.push({x, y});
            }
        }
    }
    return map;
}