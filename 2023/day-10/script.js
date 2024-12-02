import fs from 'fs'

const connectionMap = {
    "F": [
        {x: 1, y: 0},
        {x: 0, y: 1}
    ],
    "7": [
        {x: -1, y: 0},
        {x: 0, y: 1}
    ],
    "J": [
        {x: -1, y: 0},
        {x: 0, y: -1}
    ],
    "L": [
        {x: 1, y: 0},
        {x: 0, y: -1}
    ],
    "|": [
        {x: 0, y: 1},
        {x: 0, y: -1}
    ],
    "-": [
        {x: 1, y: 0},
        {x: -1, y: 0}
    ],
    "S": [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1},
    ],
}

export function isConnectedOneWay(map, cur, next) {
    const char = get(map, cur);
    if(!connectionMap[char]) return false;

    const dif = {
        x: next.x - cur.x,
        y: next.y - cur.y
    }
    return !!connectionMap[char].find(e => e.x == dif.x && e.y == dif.y);
}

export function isConnectedTwoWay(map, cur, next) {
    return isConnectedOneWay(map, cur, next) && isConnectedOneWay(map, next, cur)
}

export function get(map, {x, y}) {
    return map[y][x]
}

export function set(map, {x, y}, char) {
    return map[y][x] = (""+char).padStart(5, " ")
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

export function getConnectedTiles(map, {x, y}) {
    const up = {x, y: y-1}
    const down = {x, y: y+1}
    const left = {x: x-1, y}
    const right = {x: x+1, y}

    return [up, down, left, right].filter(e => isConnectedTwoWay(map, {x, y}, e))
}

export function parseMap(text) {
    return text.split("\n").map(line => line.split(""))
}

export function getNextTile(prev, cur) {
    
}

export function findStart(map) {
    const line = map.find(line => line.includes("S"));
    const start = {y: map.indexOf(line), x: line.indexOf("S")}
    map[start.y][start.x] = "|"
    return start;
}

export function getConnectionMap(map) {
    const start = findStart(map);
    const out = map.slice().map(x => x.slice().map(_ => "xxxxx"))

    let steps = 0;


    let next = [start];
    while (next.length > 0) {
        next.forEach(tile => {
            set(out, tile, steps)
        })
        next = next.map(e => getConnectedTiles(map, e)).flat().filter(e => {
            const outChar = get(out, e);
            return outChar === "xxxxx"
        })
        steps ++;
    }

    console.log("Took", steps, "steps")

    fs.writeFileSync("./day-10/out.txt", out.map(e => e.join("\t")).join("\n"))
    return out;
}

export function countEnclosedTiles(map) {
    const connectionMap = getConnectionMap(map);
    let enclosed = 0;
    connectionMap.forEach((line, y) => {
        let pipes = 0;
        let lastEdge = ""
        let lastPipe = -100;
        line.forEach((tile, x) => {
            if (tile !== "xxxxx") {
                let tileChar = get(map, {x, y});
                if (y == 4 && tileChar == "L") {
                    console.log(line);
                }
                if (tileChar == "|") {
                    pipes++;
                    lastEdge = "";
                }
                if (isEdgeOppositeDirection(tileChar, lastEdge)) {
                    pipes++;
                    lastEdge = "";
                } else if (isEdgeSameDirection(tileChar, lastEdge)) {
                    lastEdge = "";
                } else {
                    if (tileChar == "7" || tileChar == "J" || tileChar == "F" || tileChar == "L") {
                        lastEdge = tileChar;
                    }
                }
                set(connectionMap, {x, y}, ("" + pipes).padStart(5, " "))
                lastPipe = tile;
            } else if(pipes % 2 == 1) {
                enclosed++;
                set(connectionMap, {x, y}, "_____")
            } else {
                set(connectionMap, {x, y}, "@@@@@")
            }
        })
    })
    console.log("Found", enclosed, "enclosed tiles")
    fs.writeFileSync("./day-10/out_2.txt", connectionMap.map(e => e.join("\t")).join("\n"))
}

export function isEdgeOppositeDirection(lastEdge, nextEdge) {
    if (lastEdge == "F" && nextEdge == "J" || nextEdge == "F" && lastEdge == "J") {
        return true;
    }
    if (lastEdge == "7" && nextEdge == "L" || nextEdge == "7" && lastEdge == "L") {
        return true;
    }

    return false;
}



export function isEdgeSameDirection(lastEdge, nextEdge) {
    if (lastEdge == "F" && nextEdge == "7" || nextEdge == "F" && lastEdge == "7") {
        return true;
    }
    if (lastEdge == "J" && nextEdge == "L" || nextEdge == "J" && lastEdge == "L") {
        return true;
    }

    return false;
}