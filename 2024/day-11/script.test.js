import fs from 'fs'
import { blink, blinkCached, blinkMap, blinkMapMultiple, blinkMultiple, parseStones, parseStonesMap } from './script';

const path = './2024/day-11';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 11 Script", () => {

    it("star1 example", () => {
        let stones = parseStones(example);
        expect(blinkMultiple(stones, 1)).toEqual([253000, 1, 7])
        expect(blinkMultiple(stones, 2)).toEqual([253, 0, 2024, 14168])
        expect(blinkMultiple(stones, 3)).toEqual([512072, 1, 20, 24, 28676032])
        expect(blinkMultiple(stones, 4)).toEqual([512, 72, 2024, 2, 0, 2, 4, 2867, 6032])
        expect(blinkMultiple(stones, 5)).toEqual([1036288, 7, 2, 20, 24, 4048, 1, 4048, 8096, 28, 67, 60, 32])
        expect(blinkMultiple(stones, 6)).toEqual([2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8, 6, 7, 6, 0, 3, 2])
        
        const result = blinkMultiple(stones, 25).length;
        expect(result).toBe(55312);
    })

    it("star1", () => {
        let stones = parseStones(input);
        const result = blinkMultiple(stones, 25).length
        console.log(result)
    })

    it("star2 example", () => {
        let stonesMap = parseStonesMap(example);
        expect(Object.values(blinkMapMultiple(stonesMap, 1)).reduce((agg, cur) => agg + cur, 0)).toBe(3);
        expect(Object.values(blinkMapMultiple(stonesMap, 2)).reduce((agg, cur) => agg + cur, 0)).toBe(4);
        expect(Object.values(blinkMapMultiple(stonesMap, 3)).reduce((agg, cur) => agg + cur, 0)).toBe(5);
        expect(Object.values(blinkMapMultiple(stonesMap, 4)).reduce((agg, cur) => agg + cur, 0)).toBe(9);
        expect(Object.values(blinkMapMultiple(stonesMap, 25)).reduce((agg, cur) => agg + cur, 0)).toBe(55312);
    })

    it("map", () => {

        expect(blinkMap(parseStonesMap("512072 1 20 24 28676032"))).toEqual({512: 1, 72: 1, 2024: 1, 0: 1, 2: 2, 4: 1, 2867: 1, 6032: 1})
    })

    it("star2", () => {
        let stones = parseStonesMap(input);
        const result = Object.values(blinkMapMultiple(stones, 75)).reduce((agg, cur) => agg + cur, 0)
        console.log(result)
    })

})