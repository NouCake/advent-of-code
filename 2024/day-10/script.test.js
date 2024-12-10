import fs from 'fs'
import { countUniqueTrails, findTrails, parseMap } from './script';

const path = './2024/day-10';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 10 Script", () => {

    it("star1 example", () => {
        const map = parseMap(example);
        const trails = findTrails(map);

        const result = countUniqueTrails(trails);
        expect(result).toBe(36);
    })

    it("star1", () => {
        const map = parseMap(input);
        const trails = findTrails(map);

        const result = countUniqueTrails(trails);
        console.log(result)
    })

    it("star2 example", () => {
        const map = parseMap(example);
        const trails = findTrails(map);

        const result = trails.length;
        expect(result).toBe(81);
    })

    it("star2", () => {
        const map = parseMap(input);
        const trails = findTrails(map);
        
        const result = trails.length;
        console.log(result)
    })

})