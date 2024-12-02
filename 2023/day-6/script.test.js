import fs from 'fs'
const { parseRace, getDistanceTable, calculateNumberOfWins, toCoolerRace, calculateResultFromSolution, getMinWin, numOfWinsByIndex, calculateDistance } = require("./script")

describe("Day5 Script", () => {

    it("minwin", () => {
        expect(numOfWinsByIndex(71530, getMinWin(71530, 940200))).toBe(71503)
    })

    it("example", () => {
        const input = fs.readFileSync('./day-6/example.txt', 'utf8')
        let races = toCoolerRace(parseRace(input));
        const solutions = races.map(race => calculateNumberOfWins(race.time, race.distance))
        const result = calculateResultFromSolution(solutions)
        expect(result).toBe(288)
    })

    it("star1", () => {
        const input = fs.readFileSync('./day-6/input.txt', 'utf8')
        let races = toCoolerRace(parseRace(input));
        const solutions = races.map(race => calculateNumberOfWins(race.time, race.distance))
        const result = calculateResultFromSolution(solutions)
        console.log(result)
    })

    it("star2", () => {
        const time = 57_72_69_92;
        //               291_1172_9991_7312
        const distance = 291_1172_1176_2026;

        const minwin = getMinWin(time, distance) - 1;
        console.log("Min Win: ", minwin, calculateDistance(time, minwin))
        console.log(numOfWinsByIndex(time, minwin))
    })
    
    it("calculates the distance table", () => {
        const distanceTable = getDistanceTable(7)
        
        expect(distanceTable).toEqual([0, 6, 10, 12, 12, 10, 6, 0])
    })

    it("parses", () => {
        const input = fs.readFileSync('./day-6/example.txt', 'utf8')
        const race = parseRace(input)

        expect(race.time).toEqual([7,  15,   30])
        expect(race.distance).toEqual([9,  40,  200])
    })

})