import fs from 'fs'

const { listDifference, listSimilarity } = require("./script")

const path = './2024/day-1';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day5 Script", () => {

    it("star1 example", () => {
        const result = listDifference(example);

        expect(result).toBe(11);
    })

    it("star1", () => {
        const result = listDifference(input);

        console.log(result)
        expect(result).toBe(2378066);
    })

    it("star2 example", () => {
        const result = listSimilarity(example)
        expect(result).toBe(31);
    })

    it("star2", () => {
        const result = listSimilarity(input)
        console.log(result)
        expect(result).toBe(18934359);
    })

})