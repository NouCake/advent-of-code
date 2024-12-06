export function parseMap(input) {
    return input.split("\n").map(line => line.split(""));
}

export function findNextObstacle(map, x, y, dx, dy) {
    const width = map[0].length;
    const height = map.length;
    map[y][x] = "X";
    while (map[y + dy] && map[y + dy][x + dx] !== "#") {
        x += dx;
        y += dy;

        map[y][x] = "X";
        if (!map[y + dy] || !map[y + dy][x + dx]) {
            return false;
        }
    }
    return [x, y];
}

export function findStart(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "^") {
                return [x, y];
            }
        }
    }
}

export function rotateRight([x, y]) {
    return [-y === 0 ? 0 : -y, x === 0 ? 0 : x];
}