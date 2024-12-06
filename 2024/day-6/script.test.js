import fs from 'fs'
import { findNextObstacle, findStart, parseMap, rotateRight } from './script';

const path = './2024/day-6';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 6 Script", () => {

    it("rotatesCorrectly", () => {
        let start = [0, -1];

        start = rotateRight(start);
        expect(start[0]).toBe(1);
        expect(start[1]).toBe(0);

        start = rotateRight(start);
        expect(start[0]).toBe(0);
        expect(start[1]).toBe(1);

        start = rotateRight(start);
        expect(start[0]).toBe(-1);
        expect(start[1]).toBe(0);

        start = rotateRight(start);
        expect(start[0]).toBe(0);
        expect(start[1]).toBe(-1);
    })

    it("finds start position", () => {
        const map = parseMap(example);
        const startPos = findStart(map);
        expect(startPos).toEqual([4, 6]);

        const next = findNextObstacle(map, startPos[0], startPos[1], 0, -1);
        expect(next).toEqual([4, 1]);
    })

    it("star1 example", () => {
        const map = parseMap(example);
        let position = findStart(map);
        let direction = [0, -1];
        while(position) {
            position = findNextObstacle(map, position[0], position[1], direction[0], direction[1]);
            direction = rotateRight(direction);
        }
        const stepCount = map.flat().filter(cell => cell === "X").length;
        const result = map.map(line => line.join("")).join("\n");
        expect(result).toBe(
            `....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..`);
        expect(stepCount).toBe(41);
    })

    it("star1", () => {
        const map = parseMap(input);
        let position = findStart(map);
        let startPositions = [position];
        let direction = [0, -1];
        while(position) {
            position = findNextObstacle(map, position[0], position[1], direction[0], direction[1]);
            direction = rotateRight(direction);
        }
        const result = map.flat().filter(cell => cell === "X").length;
        console.log(result)
    })

    it("star2 example", () => {
        let map = parseMap(example);

        let loopCount = 0;
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {map = parseMap(example);
                let position = findStart(map);
                let direction = [0, -1];
                let positions = [];
                if (map[y][x] === "#" || map[y][x] === "^") {
                    continue;
                }
                map[y][x] = "#";
                //console.log(map.map(line => line.join("")).join("\n"));
                let loop = false;
                while(position) {
                    if (positions.filter(({p, d}) => 
                        p[0] === position[0] && p[1] === position[1] &&
                        d[0] === direction[0] && d[1] === direction[1]
                    ).length > 0) {
                        loop = true;
                        break;
                    }
                    positions.push({p: position, d: direction});
                    position = findNextObstacle(map, position[0], position[1], direction[0], direction[1]);
                    direction = rotateRight(direction);
                }
                if (loop) {
                    loopCount++;
                }
            }
        }

        const result = loopCount;
        expect(result).toBe(6);
    })

    it("star2", () => {
        let map = parseMap(input);

        let loopCount = 0;
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {map = parseMap(input);
                let position = findStart(map);
                let direction = [0, -1];
                let positions = [];
                if (map[y][x] === "#" || map[y][x] === "^") {
                    continue;
                }
                map[y][x] = "#";
                //console.log(map.map(line => line.join("")).join("\n"));
                let loop = false;
                while(position) {
                    if (positions.filter(({p, d}) => 
                        p[0] === position[0] && p[1] === position[1] &&
                        d[0] === direction[0] && d[1] === direction[1]
                    ).length > 0) {
                        loop = true;
                        break;
                    }
                    positions.push({p: position, d: direction});
                    position = findNextObstacle(map, position[0], position[1], direction[0], direction[1]);
                    direction = rotateRight(direction);
                }
                if (loop) {
                    loopCount++;
                }
            }
        }

        const result = loopCount;
        console.log(result)
    })

})