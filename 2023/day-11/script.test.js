import fs from 'fs'

const { compareHands, getCardValue, parseHand, compareHighestCard, findUniverses, findEmptyRows, findEmptyCols, calculateDistance } = require("./script")

describe("Day11 Script", () => {

    it("example star1", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')
        const universes = findUniverses(input)

        const emptyCols = findEmptyCols(input)
        const emptyRows = findEmptyRows(input)

        const distances = []
        for(let i = 0; i < universes.length-1; i++) {
            for(let j = i+1; j < universes.length; j++) {
                const a = universes[i]
                const b = universes[j]

                distances.push(calculateDistance(a, b, emptyRows, emptyCols, 2))
            }
        }
        
        const sum = distances.reduce((agg, cur) => agg + cur, 0)

        expect(sum).toBe(374)
    })

    it("star1", () => {
        const input = fs.readFileSync('./day-11/input.txt', 'utf8')
        const universes = findUniverses(input)

        const emptyCols = findEmptyCols(input)
        const emptyRows = findEmptyRows(input)

        const distances = []
        for(let i = 0; i < universes.length-1; i++) {
            for(let j = i+1; j < universes.length; j++) {
                const a = universes[i]
                const b = universes[j]

                distances.push(calculateDistance(a, b, emptyRows, emptyCols, 2))
            }
        }
        
        const sum = distances.reduce((agg, cur) => agg + cur, 0)

        console.log("Sum is", sum)
    })

    it("example star2", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')
        const universes = findUniverses(input)

        const emptyCols = findEmptyCols(input)
        const emptyRows = findEmptyRows(input)

        const distances = []
        for(let i = 0; i < universes.length-1; i++) {
            for(let j = i+1; j < universes.length; j++) {
                const a = universes[i]
                const b = universes[j]

                distances.push(calculateDistance(a, b, emptyRows, emptyCols, 10))
            }
        }
        
        const sum = distances.reduce((agg, cur) => agg + cur, 0)

        expect(sum).toBe(1030)
    })

    it("star2", () => {
        const input = fs.readFileSync('./day-11/input.txt', 'utf8')
        const universes = findUniverses(input)

        const emptyCols = findEmptyCols(input)
        const emptyRows = findEmptyRows(input)

        const distances = []
        for(let i = 0; i < universes.length-1; i++) {
            for(let j = i+1; j < universes.length; j++) {
                const a = universes[i]
                const b = universes[j]

                distances.push(calculateDistance(a, b, emptyRows, emptyCols, 1000000))
            }
        }
        
        const sum = distances.reduce((agg, cur) => agg + cur, 0)

        console.log("Sum is", sum)
    })

    it("parses", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')
        const universes = findUniverses(input)

        expect(universes.length).toBe(9)
    })

    it("empty rows", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')

        const emptyRows = findEmptyRows(input)

        expect(emptyRows.length).toBe(2)
        expect(emptyRows).toEqual([3, 7])
    })

    it("empty cols", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')

        const emptyRows = findEmptyCols(input)

        expect(emptyRows.length).toBe(3)
        expect(emptyRows).toEqual([2, 5, 8])
    })

    it("calculates distances", () => {
        const input = fs.readFileSync('./day-11/example.txt', 'utf8')
        const universes = findUniverses(input)

        const emptyCols = findEmptyCols(input)
        const emptyRows = findEmptyRows(input)

        let distance = calculateDistance(universes[0], universes[6], emptyRows, emptyCols, 2)
        expect(distance).toBe(15)

        distance = calculateDistance(universes[2], universes[5], emptyRows, emptyCols, 2)
        expect(distance).toBe(17)

        distance = calculateDistance(universes[7], universes[8], emptyRows, emptyCols, 2)
        expect(distance).toBe(5)
    })

    it("calculates the power", () => {
    })

    it("calcualtes card value", () => {
    });
})