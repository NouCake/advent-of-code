import fs from 'fs'
import { blink, blinkCached, blinkMap, blinkMapMultiple, blinkMultiple, findNumSides, findOutline, findRegions, parseMap, parseStones, parseStonesMap } from './script';

const path = './2024/day-12';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');

describe("Day 12 Script", () => {

    it("star1 example", () => {
        const map = parseMap(example);
        const regions = findRegions(map);
        const result = regions.reduce((acc, cur) => acc += findOutline(cur).length * cur.coords.length, 0);

        expect(result).toBe(140);
    })

    it("star1", () => {
        const map = parseMap(input);
        const regions = findRegions(map);
        const result = regions.reduce((acc, cur) => acc += findOutline(cur).length * cur.coords.length, 0);
        console.log(result)
    })

    it("star2 example", () => {
        const map = parseMap(example);
        const regions = findRegions(map);
        console.log(regions.map(e => e.identifier));
        const outlines = regions.map(region => findOutline(region));
        const sides = outlines.map((outline, index) => findNumSides(outline, regions[index].identifier));
        console.log(sides)
        const result = sides.reduce((acc, cur, index) => acc += cur * regions[index].coords.length, 0);
        expect(result).toBe(1206);
    })

    it("star2", () => {
        const map = parseMap(input);
        const regions = findRegions(map);
        console.log(regions.map(e => e.identifier));
        const outlines = regions.map(region => findOutline(region));
        const sides = outlines.map((outline, index) => findNumSides(outline, regions[index].identifier));
        const result = sides.reduce((acc, cur, index) => acc += cur * regions[index].coords.length, 0);
        console.log(result)
    })

})