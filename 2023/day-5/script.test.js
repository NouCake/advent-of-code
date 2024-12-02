const { createConversionMap, parseRule, parseBlock, createRangeConversionMap, convertRangeWithRule, star2 } = require("./script")

describe("Day5 Script", () => {

    it("star2", () => {
        star2()
    })

    it("lookup", () => {
        const lookup = createConversionMap([
            {source: 100, destination: 250, range: 50},
            {source: 1000, destination: 1100, range: 50},
            {source: 300, destination: 100, range: 15},
        ])

        expect(lookup(100)).toBe(250)
        expect(lookup(120)).toBe(270)
        expect(lookup(150)).toBe(150)

        expect(lookup(1000)).toBe(1100)
        expect(lookup(1015)).toBe(1115)


        expect(lookup(300)).toBe(100)
        expect(lookup(310)).toBe(110)

        expect(lookup(99)).toBe(99)
    })

    it("lookuep example", () => {
        const lookup = createConversionMap([
            {source: 98, destination: 50, range: 2},
            {source: 50, destination: 52, range: 48},
        ])

        expect(lookup(59)).toBe(61)
    })

    it("parses a rule", () => {
        const input = "seed-to-soil map:\n50 98 2\n52 50 48"

        const block = parseBlock(input);
        expect(block.length).toBe(2)
        expect(block[0]).toEqual({source: 98, destination: 50, range: 2})
        expect(block[1]).toEqual({source: 50, destination: 52, range: 48})
    });

    it("parses a block", () => {
        const input = "2425309256 1035790247 296756276"
        expect(parseRule(input)).toEqual({source: 1035790247, destination: 2425309256, range: 296756276})
    });

    it("converts a range", () => {
        const rules = [
            {source: 50, destination: 1000, range: 10},
            {source: 70, destination: 2000, range: 10},
        ]

        const range = {start: 40, end: 100};
        
        const converter = createRangeConversionMap(rules);
        const result = converter([range]);

        expect(result.length).toBe(5)
        expect(result[0]).toEqual({start: 1000, end: 1010})
        expect(result[1]).toEqual({start: 2000, end: 2010})
        expect(result[2]).toEqual({start: 40, end: 50})
        expect(result[3]).toEqual({start: 60, end: 70})
        expect(result[4]).toEqual({start: 80, end: 100})
    });

    it("converts a single range", () => {
        const rule = {source: 50, destination: 1000, range: 10}

        const range = {start: 40, end: 100};
        
        const result = convertRangeWithRule(range, rule);

        expect(result.converted.length).toBe(1)
        expect(result.unconverted.length).toBe(2)

        expect(result.unconverted[0]).toEqual({start: 40, end: 50})
        expect(result.unconverted[1]).toEqual({start: 60, end: 100})
        expect(result.converted[0]).toEqual({start: 1000, end: 1010})
    });

    it("converts range without bugs", () => {
        const rule = {source: 70, destination: 2000, range: 10}

        const range = {start: 40, end: 50};
        
        const result = convertRangeWithRule(range, rule);

        expect(result.converted.length).toBe(0)
        expect(result.unconverted.length).toBe(1)

        expect(result.unconverted[0]).toEqual({start: 40, end: 50})
    })

    it("converts range without more bugs", () => {
        const rule = {source: 52, destination: 50, range: 48}

        const range = {start: 79, end: 93};
        
        const result = convertRangeWithRule(range, rule);

        expect(result.converted.length).toBe(1)
        expect(result.unconverted.length).toBe(0)

        expect(result.converted[0]).toEqual({start: 77, end: 91})
    })



})