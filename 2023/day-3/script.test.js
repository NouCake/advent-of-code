const { parseSchematic, getGears, getAdjacentNumbers } = require("./script")

describe("Day3 Script", () => {

    it("parses a schematic", () => {
        const schematicText = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
.......755
...$..*...
.664.598..`

        const scheme = parseSchematic(schematicText);
        expect(scheme.get(0, 0)).toBe("4")
        expect(scheme.get(1, 9)).toBe("6")

        expect(scheme.numbers.length).toBe(10)
        expect(scheme.numbers.filter(e => e.adjacent).length).toBe(8)
        expect(scheme.sum).toBe(4361)

        expect(getAdjacentNumbers(scheme, scheme.symbols[0]).length).toBe(2)

        const gears = getGears(scheme);

        expect(gears.length).toBe(2);
        expect(gears.ratio).toBe(467835);
    })

})