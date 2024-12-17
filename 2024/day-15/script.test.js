import fs from 'fs'
import { doInstruction, doInstructionLarge, parseInput, printMap, sizeUpInput, tryMoveBox } from './script';

const path = './2024/day-15';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 15 Script", () => {

    it("star1 example", () => {
        const {map, instructions} = parseInput(example);
        printMap(map);
        for(let i = 0; i < instructions.length; i++) {
            doInstruction(map, instructions[i]);
        }
        printMap(map);

        const result = map.boxes
            .map(box => box.y * 100 + box.x)
            .reduce((acc, val) => acc + val);
        expect(result).toBe(10092);
    })

    it("star1", () => {
        const {map, instructions} = parseInput(input);
        printMap(map);
        for(let i = 0; i < instructions.length; i++) {
            doInstruction(map, instructions[i]);
        }
        printMap(map);

        const result = map.boxes
            .map(box => box.y * 100 + box.x)
            .reduce((acc, val) => acc + val);
        console.log(result)
    })

    it("star2 example", () => {
        const {map, instructions} = parseInput(sizeUpInput(example), true);
        printMap(map);

        const iinn = example.split('\n\n')[1].split('\n').join("").split("");
        for(let i = 0; i < instructions.length; i++) {
            doInstructionLarge(map, instructions[i]);
            //printMap(map, iinn[i]+"\n");
        }

        const result = map.boxes
            .map(box => box.y * 100 + box.x)
            .reduce((acc, val) => acc + val);
        expect(result).toBe(9021);
    })

    it("star2", () => {
        const {map, instructions} = parseInput(sizeUpInput(input), true);
        printMap(map);

        for(let i = 0; i < instructions.length; i++) {
            doInstructionLarge(map, instructions[i]);
        }
        printMap(map);

        const result = map.boxes
            .map(box => box.y * 100 + box.x)
            .reduce((acc, val) => acc + val);
        console.log(result)
    })

})