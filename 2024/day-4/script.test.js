import fs from 'fs'
import { findDiagonal, findHorizontal, findXMas, parseInput, reversePuzzle, transposePuzzle } from './script';

const path = './2024/day-4';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 4 Script", () => {

    it("star1 example", () => {
        const puzzle = parseInput(example);

        const result =  findHorizontal(puzzle) + 
                        findHorizontal(reversePuzzle(puzzle)) +
                        findHorizontal(transposePuzzle(puzzle)) +
                        findHorizontal(reversePuzzle(transposePuzzle(puzzle))) +
                        findDiagonal(puzzle) + 
                        findDiagonal(reversePuzzle(puzzle));;

        expect(result).toBe(18);
    })

    it("star1", () => {
        const puzzle = parseInput(input);

        const result =  findHorizontal(puzzle) + 
                        findHorizontal(reversePuzzle(puzzle)) +
                        findHorizontal(transposePuzzle(puzzle)) +
                        findHorizontal(reversePuzzle(transposePuzzle(puzzle))) +
                        findDiagonal(puzzle) + 
                        findDiagonal(reversePuzzle(puzzle));;

        console.log(result)
    })

    it("star2 example", () => {
        const puzzle = parseInput(example);
        const result = findXMas(puzzle);
        expect(result).toBe(9);
    })

    it("star2", () => {
        const puzzle = parseInput(input);
        const result = findXMas(puzzle);
        console.log(result)
    })

})