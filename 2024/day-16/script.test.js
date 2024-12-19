import fs from 'fs'
import { findShortestPath, findShortestPathBBAA, parseInput, printPath, rotationsFromDirection } from './script';

const path = './2024/day-16';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 16 Script", () => {

    it("star1 example", () => {
        expect(rotationsFromDirection({x: -1, y: 0}, {x: 0, y: -1})).toBe(1);
        expect(rotationsFromDirection({x: 1, y: 0}, {x: 0, y: -1})).toBe(1);

        const map = parseInput(example);
        expect(map.start).toEqual({x: 1, y: 13})
        const result = findShortestPath(map)
        //console.log(printPath(result[0].path.map(e => map.paths[e])))
        expect(result[0].cost).toBe(7036);
    })

    it("star1 s", () => {
        const map = parseInput(input);
        const result = findShortestPath(map)
        //console.log(printPath(result.path.map(e => map.paths[e])))

        console.log(result[0].cost)
    })

    it("star2 example", () => {
        const map = parseInput(example);
        const result = findShortestPathBBAA(map, 7036)

        const allTiles = new Set();
        result.forEach(r => r.path.forEach(p => allTiles.add(p)));
        expect(allTiles.size).toBe(45);
        
        expect(result[0].cost).toBe(7036);
    })

    it("star2", () => {
        const map = parseInput(input);
        const result = findShortestPathBBAA(map, 91464)

        const allTiles = new Set();
        result.forEach(r => r.path.forEach(p => allTiles.add(p)));

        console.log(allTiles.size)
    })

})