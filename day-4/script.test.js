const { parseCard, getWinngCopyIds } = require("./script")

describe("Day3 Script", () => {

    it("parses a card", () => {
        const cardLine = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
        const card = parseCard(cardLine);

        expect(card.id).toBe(1)
        expect(card.winningNumbers).toEqual([41, 48, 83, 86, 17])
        expect(card.yourNumbers).toEqual([83, 86, 6, 31, 17, 9, 48, 53])
    })

    it("calculates the correct score", () => {
        const cardLine = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
        const card = parseCard(cardLine);

        const matching = [48, 83, 86, 17]
        matching.score = 8
        expect(card.matching).toEqual(matching)
    })

    it("copy wins", () => {
        const cardLine = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
        const card = parseCard(cardLine);

        expect(getWinngCopyIds(card)).toEqual([2, 3, 4, 5])
    })
})