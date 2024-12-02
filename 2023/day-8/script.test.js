import fs from 'fs'

const { parseInput, calcNumberOfTuns, lcm } = require("./script")

describe("Day8 Script", () => {

    it("example star 1", () => {
        const input = fs.readFileSync('./day-8/example.txt', 'utf8')
        
        const puzzle = parseInput(input)

        expect(puzzle.turns).toBe("LLR")

        const mapValues = Object.values(puzzle.map)
        expect(mapValues.length).toBe(3)
        expect(mapValues[0]).toEqual({element: "AAA", left: "BBB", right: "BBB"})
        expect(mapValues[1]).toEqual({element: "BBB", left: "AAA", right: "ZZZ"})
        expect(mapValues[2]).toEqual({element: "ZZZ", left: "ZZZ", right: "ZZZ"})

        expect(calcNumberOfTuns(puzzle.map, puzzle.turns, "AAA", ["ZZZ"])).toBe(6)
    })

    it("star 1", () => {
        const input = fs.readFileSync('./day-8/input.txt', 'utf8')
        
        const puzzle = parseInput(input)

        const result = calcNumberOfTuns(puzzle.map, puzzle.turns, "AAA", ["ZZZ"])
        console.log("Traversing took", result, "steps");
    })

    it("star 2", () => {
        const input = fs.readFileSync('./day-8/input.txt', 'utf8')
        
        const puzzle = parseInput(input)

        const startValues = Object.keys(puzzle.map).filter(e => e.endsWith("A"))
        const endValues = Object.keys(puzzle.map).filter(e => e.endsWith("Z"))

        const turnNumbers = startValues.map(e => calcNumberOfTuns(puzzle.map, puzzle.turns, e, endValues))
        //const result = calcNumberOfTuns(puzzle.map, puzzle.turns, "AAA", "ZZZ")
        console.log(startValues)
        console.log(turnNumbers)
        console.log(turnNumbers.reduce((agg, cur) => lcm(agg, cur), 1))
    })

})