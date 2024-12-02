import { findFirstNumber, findLastNumber, findSpelledNumbers, replaceSpelledNumber } from "./script"

describe("Day1 Script", () => {
 
    it("finds first number in line", () => {

        expect(findFirstNumber("eightwothree")).toBe("8")
        expect(findFirstNumber("4eight")).toBe("4")
        expect(findFirstNumber("iajen9eight")).toBe("9")
        expect(findFirstNumber("thr339four")).toBe("3")
        expect(findFirstNumber("thr339four99")).toBe("3")
        expect(findFirstNumber("iwuefiveqweoj")).toBe("5")
    })
 
    it("finds last number in line", () => {
        expect(findLastNumber("eightwothree")).toBe("3")
        expect(findLastNumber("4eight")).toBe("8")
        expect(findLastNumber("iajen9eight")).toBe("8")
        expect(findLastNumber("thr339four")).toBe("4")
        expect(findLastNumber("thr339four9")).toBe("9")
        expect(findLastNumber("thr339four9ei")).toBe("9")
        expect(findLastNumber("iwuefiveqweoj")).toBe("5")
        expect(findLastNumber("five68five")).toBe("5")
    })

    it("finds all spelled nubmers", () => {
        const line = "eightoneeightwo";
        const spelled = findSpelledNumbers(line);

        console.log(spelled)
        expect(spelled.length).toBe(4)

        expect(spelled[0].index).toBe(0)
        expect(spelled[1].index).toBe(5)
        expect(spelled[2].index).toBe(8)
        expect(spelled[3].index).toBe(12)
    })

    it("finds more all spelled nubmers", () => {
        const line = "five68five";
        const spelled = findSpelledNumbers(line);

        console.log(spelled)
        expect(spelled.length).toBe(2)

        expect(spelled[0].index).toBe(0)
        expect(spelled[1].index).toBe(6)
    })

    it("replaces even more spelled numbers", () => {
        const line = "five68five";
        const spelled = findSpelledNumbers(line);
        expect(replaceSpelledNumber(line, spelled[0])).toBe("568five")
        expect(replaceSpelledNumber(line, spelled[1])).toBe("five685")
    })

    it("replaces spelled numbers", () => {
        const line = "eightoneeightwo";
        const spelled = findSpelledNumbers(line);
        expect(replaceSpelledNumber(line, spelled[0])).toBe("8oneeightwo")
        expect(replaceSpelledNumber(line, spelled[1])).toBe("eight1eightwo")
        expect(replaceSpelledNumber(line, spelled[2])).toBe("eightone8wo")
        expect(replaceSpelledNumber(line, spelled[3])).toBe("eightoneeigh2")
    })

    it("replaces more spelled numbers", () => {
        const line = "onetwothree";
        const spelled = findSpelledNumbers(line);
        expect(replaceSpelledNumber(line, spelled[0])).toBe("1twothree")
        expect(replaceSpelledNumber(line, spelled[1])).toBe("one2three")
        expect(replaceSpelledNumber(line, spelled[2])).toBe("onetwo3")
    })

    it("sums example correct", () => {
        const input = `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        five68five`;
        const lines = input.split('\n');

        const parsedLines = lines
            .map(line =>  findFirstNumber(line) + findLastNumber(line))

        const sum = parsedLines
            .reduce(
                (acc, cur) => Number.parseInt(cur) + acc,
                0
            );

        console.log(parsedLines)
        expect(sum).toBe(281)
    })

    it("goes crazy", () => {
        const line = "five68five";
        expect(findFirstNumber(line) + findLastNumber(line)).toBe("55");
    })

})