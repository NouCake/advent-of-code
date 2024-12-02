import fs from 'fs'

const { isConnectedOneWay, isConnectedTwoWay, getConnectionMap, parseMap, findStart, getConnectedTiles, countEnclosedTiles } = require("./script")

describe("Day5 Script", () => {

    it("star1", () => {
        const input = fs.readFileSync('./day-10/input.txt', 'utf8')
    })

    it("parses", () => {
    })

    it("checks connection", () => {
        const input = fs.readFileSync('./day-10/example.txt', 'utf8')
        const map = parseMap(input);

        expect(isConnectedOneWay(map, {x: 1, y: 1}, {x: 2, y: 1})).toBe(true);
        expect(isConnectedOneWay(map, {x: 1, y: 1}, {x: 0, y: 0})).toBe(false);


        expect(isConnectedOneWay(map, {x: 0, y: 0}, {x: 1, y: 0})).toBe(true);
        expect(isConnectedTwoWay(map, {x: 0, y: 0}, {x: 1, y: 0})).toBe(false);
        expect(isConnectedTwoWay(map, {x: 1, y: 1}, {x: 0, y: 1})).toBe(false);
    })

    it("finds the start", () => {
        const input = fs.readFileSync('./day-10/example.txt', 'utf8')
        const map = parseMap(input);

        expect(findStart(map)).toEqual({x: 1, y: 1})
    })

    it("getConnectionMap", () => {
        const input = fs.readFileSync('./day-10/input.txt', 'utf8')
        const map = parseMap(input);
        
        countEnclosedTiles(map);
    })

    it("getConnectedTiles", () => {
        const input = fs.readFileSync('./day-10/example.txt', 'utf8')
        const map = parseMap(input);
        
        
        expect(isConnectedTwoWay(map, {x: 3, y: 1}, {x: 3, y: 0})).toBe(true);
        expect(isConnectedTwoWay(map, {x: 3, y: 1}, {x: 3, y: 2})).toBe(true);
        
        // const connected = getConnectedTiles(map, {x: 1, y: 2})
        // expect(connected).toEqual([
        //     {x: 1, y: 1},
        //     {x: 1, y: 3}
        // ])
    });
})