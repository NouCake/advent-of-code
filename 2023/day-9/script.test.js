import fs from 'fs'

const { extrapolate, isZeroSequence, extrapolate_back } = require("./script")

describe("Day9 Script", () => {

    it("example star1", () => {
        const input = fs.readFileSync('./day-9/example.txt', 'utf8')
        const sequences = input.split("\n").map(line => line.split(" ").map(e => Number.parseInt(e)))

        const extrapolated = sequences.map(extrapolate)
        expect(extrapolated.reduce((agg, cur) => agg + cur, 0)).toBe(114)
    })

    it("star1", () => {
        const input = fs.readFileSync('./day-9/input.txt', 'utf8')
        const sequences = input.split("\n").map(line => line.split(" ").map(e => Number.parseInt(e)))

        const extrapolated = sequences.map(extrapolate)
        console.log(extrapolated.reduce((agg, cur) => agg + cur, 0))
    })

    it("example star2", () => {
        const input = fs.readFileSync('./day-9/example.txt', 'utf8')
        const sequences = input.split("\n").map(line => line.split(" ").map(e => Number.parseInt(e)))

        const extrapolated = sequences.map(extrapolate_back)
        expect(extrapolated.reduce((agg, cur) => agg + cur, 0)).toBe(2)
    })

    it("star2", () => {
        const input = fs.readFileSync('./day-9/input.txt', 'utf8')
        const sequences = input.split("\n").map(line => line.split(" ").map(e => Number.parseInt(e)))

        const extrapolated = sequences.map(extrapolate_back)
        console.log(extrapolated.reduce((agg, cur) => agg + cur, 0))
    })

    it("extrapolates a sequence", () => {
        expect(extrapolate([0, 3, 6, 9, 12])).toBe(15)
        expect(extrapolate([0, 3, 9, 27])).toBe(81)
    })

    it("find a zero sequence", () => {
        expect(isZeroSequence([0, 0, 0, 0])).toBe(true);
        expect(isZeroSequence([0, 1, 0, 0])).toBe(false);
    })

    it("compares hand", () => {
    })

    it("calculates the power", () => {
    })

    it("calcualtes card value", () => {
    });
})