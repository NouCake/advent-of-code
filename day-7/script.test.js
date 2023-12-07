import fs from 'fs'

const { compareHands, getCardValue, parseHand, compareHighestCard } = require("./script")

describe("Day5 Script", () => {

    it("example star1", () => {
        const input = fs.readFileSync('./day-7/example.txt', 'utf8')
        const lines = input.split("\n")

        const hands = lines.map(e => ({
            hand: e.split(" ")[0],
            bet: e.split(" ")[1]
        }))
        
        const games = hands.sort(compareHands);
        const result = games.reduce((agg, cur, index) => agg + cur.bet * (index+1), 0)

        expect(result).toBe(6440)
    })

    it("star1", () => {
        const input = fs.readFileSync('./day-7/input.txt', 'utf8')
        const lines = input.split("\n")

        const hands = lines.map(e => ({
            hand: e.split(" ")[0],
            bet: e.split(" ")[1]
        }))
        
        const games = hands.sort(compareHands);
        fs.writeFileSync("./day-7/output.txt", JSON.stringify(games, null, 4))
        const result = games.reduce((agg, cur, index) => agg + cur.bet * (index+1), 0)

        console.log(result)
    })



    it("example star2", () => {
        const input = fs.readFileSync('./day-7/example.txt', 'utf8')
        const lines = input.split("\n")

        const hands = lines.map(e => ({
            hand: e.split(" ")[0],
            bet: e.split(" ")[1]
        }))
        
        const games = hands.sort((a, b) => compareHands(a, b, true));
        const result = games.reduce((agg, cur, index) => agg + cur.bet * (index+1), 0)

        expect(result).toBe(5905)
    })

    it("star2", () => {
        const input = fs.readFileSync('./day-7/input.txt', 'utf8')
        const lines = input.split("\n")

        const hands = lines.map(e => ({
            hand: e.split(" ")[0],
            bet: e.split(" ")[1]
        }))
        
        const games = hands.sort((a, b) => compareHands(a, b, true));
        fs.writeFileSync("./day-7/output.txt", JSON.stringify(games, null, 4))
        const result = games.reduce((agg, cur, index) => agg + cur.bet * (index+1), 0)

        console.log(result)
    })

    it("parses", () => {
        expect(parseHand("33322")).toEqual([3, 2])
        expect(parseHand("32332")).toEqual([3, 2])
        expect(parseHand("22333")).toEqual([3, 2])
        expect(parseHand("23332")).toEqual([3, 2])
        expect(parseHand("33223")).toEqual([3, 2])
    })

    it("compares highest card", () => {
        expect(compareHighestCard("A2222", "K2222")).toBeGreaterThan(0)
        expect(compareHighestCard("K2222", "A2222")).toBeLessThan(0)
        
        expect(compareHighestCard("2222A", "2222K")).toBeGreaterThan(0)
        expect(compareHighestCard("2222K", "2222A")).toBeLessThan(0)
    })

    it("compares hand", () => {
        expect(compareHighestCard("A2222", "K2222")).toBeGreaterThan(0)
        expect(compareHighestCard("K2222", "A2222")).toBeLessThan(0)
        
        expect(compareHighestCard("2222A", "2222K")).toBeGreaterThan(0)
        expect(compareHighestCard("2222K", "2222A")).toBeLessThan(0)

        expect(compareHighestCard("32T3K", "T55J5")).toBeLessThan(0)
    })

    it("calculates the power", () => {
        const input = "32T3K"

        expect(compareHands("32T3K", "T55J5")).toBeLessThan(0)
    })

    it("calcualtes card value", () => {
        expect(getCardValue("2")).toBe(2)
        expect(getCardValue("3")).toBe(3)
        expect(getCardValue("4")).toBe(4)
        expect(getCardValue("5")).toBe(5)
        expect(getCardValue("6")).toBe(6)
        expect(getCardValue("7")).toBe(7)
        expect(getCardValue("8")).toBe(8)
        expect(getCardValue("9")).toBe(9)
        expect(getCardValue("T")).toBe(10)
        expect(getCardValue("J")).toBe(11)
        expect(getCardValue("Q")).toBe(12)
        expect(getCardValue("K")).toBe(13)
        expect(getCardValue("A")).toBe(14)
    });
})