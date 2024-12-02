const exp = require("constants");
const { parseGame, parseRound, sumGameIds, getMaxInRound, isGamePossible, calculatePower } = require("./script");

describe("Day2 Script", () => {


    it("parses a game", () => {
        const gameLine = "Game 1: 18 red, 8 green, 7 blue; 15 red, 4 blue, 1 green; 2 green, 17 red, 6 blue; 5 green, 1 blue, 11 red; 18 red, 1 green, 14 blue; 8 blue";
        const game = parseGame(gameLine);

        expect(game.id).toBe(1)
        expect(game.rounds.length).toBe(6)
        
        expect(game.rounds[0].red).toBe(18)
        expect(game.rounds[0].green).toBe(8)
        expect(game.rounds[0].blue).toBe(7)
        
        expect(game.rounds[1].red).toBe(15)
        expect(game.rounds[1].green).toBe(1)
        expect(game.rounds[1].blue).toBe(4)
        
        expect(game.rounds[2].red).toBe(17)
        expect(game.rounds[2].green).toBe(2)
        expect(game.rounds[2].blue).toBe(6)
        
        expect(game.rounds[3].red).toBe(11)
        expect(game.rounds[3].green).toBe(5)
        expect(game.rounds[3].blue).toBe(1)
        
        expect(game.rounds[4].red).toBe(18)
        expect(game.rounds[4].green).toBe(1)
        expect(game.rounds[4].blue).toBe(14)
        
        expect(game.rounds[5].red).toBe(0)
        expect(game.rounds[5].green).toBe(0)
        expect(game.rounds[5].blue).toBe(8)
    })

    it("sums the ids of all games", () => {
        const games = [
            {id: 3},
            {id: 10}
        ]

        expect(sumGameIds(games)).toBe(13)
    })

    it("parses a round", () => {
        const roundLine = "18 red, 8 green, 7 blue";
        const round = parseRound(roundLine);

        expect(round.red).toBe(18)
        expect(round.green).toBe(8)
        expect(round.blue).toBe(7)
    })

    it("finds the max number for a color in a round", () => {
        const game = parseGame("Game 1: 18 red, 8 green, 7 blue; 15 red, 4 blue, 1 green; 2 green, 17 red, 6 blue; 5 green, 1 blue, 11 red; 18 red, 1 green, 14 blue; 8 blue");

        const maxRed = getMaxInRound(game.rounds, "red");
        const maxGreen = getMaxInRound(game.rounds, "green");
        const maxBlue = getMaxInRound(game.rounds, "blue");
        expect(maxRed).toBe(18);
        expect(maxGreen).toBe(8);
        expect(maxBlue).toBe(14);
    })

    it("determines wether is possible with a given number of cubes", () => {
        const game = parseGame("Game 1: 18 red, 8 green, 7 blue; 15 red, 4 blue, 1 green; 2 green, 17 red, 6 blue; 5 green, 1 blue, 11 red; 18 red, 1 green, 14 blue; 8 blue");

        expect(isGamePossible(game, {red: 20, green: 20, blue: 20})).toBe(true)
        expect(isGamePossible(game, {red: 2, green: 20, blue: 20})).toBe(false)
    })

    it("determines the power of a game", () => {
        const game = parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

        expect(calculatePower(game)).toBe(48)
    })


})