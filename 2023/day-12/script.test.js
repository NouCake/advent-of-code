import fs from 'fs'

const { compareHands, getCardValue, parseHand, compareHighestCard, parseConfiguration, isConfigurationCorrect, countPossibleConfigurations, findPossiblePlacements, canPlace, findPossibleForAll } = require("./script")

describe("Day12 Script", () => {

    it("example star1", () => {
        const input = fs.readFileSync('./day-12/example.txt', 'utf8')
        const configurations = input.split("\n").map(e => parseConfiguration(e))

        const sum = configurations.reduce((agg, cur, index) => {
            return agg + findPossibleForAll(cur.line, cur.damaged)
        }, 0)

        expect(sum).toBe(21)
    })
    
    it("star1", () => {
        const input = fs.readFileSync('./day-12/input.txt', 'utf8')
        const configurations = input.split("\n").map(e => parseConfiguration(e))

        const sum = configurations.reduce((agg, cur, index) => {
            const is = findPossibleForAll(cur.line.split(" ")[0], cur.damaged)
            
            //const should = countPossibleConfigurations(cur);
            //console.log("Checking", cur.line, should, is)
            return agg + is
        }, 0)

        console.log("Found", sum, "possible configurations")
        expect(sum).toBe(7344)
    })


    it("example star2", () => {
        const input = fs.readFileSync('./day-12/example.txt', 'utf8')
        const configurations = input.split("\n").map(e => parseConfiguration(e))

        const sum = configurations.reduce((agg, cur, index) => {
            let line = cur.line.split(" ")[0];
            line = line + "?" + line + "?" + line + "?" + line + "?" + line
            const block = cur.damaged.concat(cur.damaged, cur.damaged, cur.damaged, cur.damaged);
            const is = findPossibleForAll(line, block)
            //console.log(line, block, is)
            return agg + is
        }, 0)

        expect(sum).toBe(525152)
    })
    
    it("star2", () => {
        const input = fs.readFileSync('./day-12/input.txt', 'utf8')
        const configurations = input.split("\n").map(e => parseConfiguration(e))

        const sum = configurations.reduce((agg, cur, index) => {
            let line = cur.line.split(" ")[0];
            line = line + "?" + line + "?" + line + "?" + line + "?" + line
            const block = cur.damaged.concat(cur.damaged, cur.damaged, cur.damaged, cur.damaged);
            const is = findPossibleForAll(line, block)
            //console.log(line, block, is)
            console.log(index)
            return agg + is
        }, 0)

        console.log("Found", sum, "possible configurations")
    })

    it("finds number of arrangements", () => {
        const input = "???.### 1,1,3";

        
    })

    it("parses", () => {
        const input = "???.### 1,1,3";
        const parsed = parseConfiguration(input);
        expect(parsed.damaged).toEqual([1,1,3])

        console.log(parsed.springs)
        expect(parsed.springs.length).toBe(3)
    })

    it("checks for correct configuration", () => {
        let configuration = parseConfiguration("???.### 1,1,3");
        expect(isConfigurationCorrect(configuration)).toBe(false);

        configuration = parseConfiguration("#.#.### 1,1,3");
        expect(isConfigurationCorrect(configuration)).toBe(true);

        configuration = parseConfiguration("###.### 3,3");
        expect(isConfigurationCorrect(configuration)).toBe(true);
    })


    it("counts possibilities", () => {
        let configuration = parseConfiguration("???.### 1,1,3");

        expect(countPossibleConfigurations(configuration)).toBe(1)
    })


    it("finds possibilities", () => {
        expect(findPossiblePlacements("??????.?#.", 1).length).toBe(7)
        expect(findPossiblePlacements("#?#????????.?#.", 4).length).toBe(1)

        expect(findPossiblePlacements("???.###", 3).length).toBe(2)
        expect(findPossiblePlacements("###", 3).length).toBe(1)
        expect(findPossiblePlacements("??.??", 1).length).toBe(4)
        expect(findPossiblePlacements("?###????????", 3).length).toBe(1)
    })


    it("finds all possibilities", () => {
        //expect(findPossibleForAll("???#???..??#?", [2,1,3])).toBe(8)
        expect(findPossibleForAll("#?#????????.?#.", [4, 1, 2, 1])).toBe(6)
    })

    it("runs", () => {
        const input = fs.readFileSync('./day-12/input.txt', 'utf8')
        const configurations = input.split("\n").map(e => parseConfiguration(e))

        const cur = configurations[8]

        let line = cur.line.split(" ")[0];
        line = line + "?" + line + "?" + line + "?" + line + "?" + line
        const block = cur.damaged.concat(cur.damaged, cur.damaged, cur.damaged, cur.damaged);

        //const confLine = line + " " + block.join(",")
        console.log(findPossibleForAll(line, block))
    })
})