import fs from 'fs'
import { doOperation, findInputForOut, parseInput, run } from './script';

const path = './2024/day-17';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 17 Script", () => {

    it("star1 example", () => {
        expect(run({
            a: 0, b: 0, c: 9,
            instructions: [2, 6],
            out: [],
            pointer: 0,
        }).b).toBe(1);

        expect(run({
            a: 10, b: 0, c: 0,
            instructions: [5, 0, 5, 1, 5, 4],
            out: [],
            pointer: 0,
        }).out).toEqual([0, 1, 2]);

        expect(run({
            a: 2024, b: 0, c: 0,
            instructions: [0, 1, 5, 4, 3, 0],
            out: [],
            pointer: 0,
        }).out).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);

        expect(run({
            a: 0, b: 29, c: 0,
            instructions: [1, 7],
            out: [],
            pointer: 0,
        }).b).toBe(26);

        expect(run({
            a: 0, b: 2024, c: 43690,
            instructions: [4, 0],
            out: [],
            pointer: 0,
        }).b).toBe(44354);

        const computer = parseInput(example);
        run(computer);
        expect(computer.out).toEqual([4,6,3,5,6,3,5,2,1,0]);
    })

    it("star1", () => {
        const computer = parseInput(input);
        run(computer);
        const result = computer.out.join(",")
        console.log(result)
    })

    it("star2 example", () => {
        const computer = {
            a: 2024, b: 0, c: 0,
            instructions: [0,3,5,4,3,0],
            out: [],
            pointer: 0,
        };
        computer.a = 117440;

        run(computer);

        console.log(computer.out.join(","));

        expect(computer.instructions).toEqual(computer.out);
    })


    it("star2 s", () => {
        const start = 20534862392784 * 8 ;
        //const end = Math.pow(2, 16 * 3) + 100;

        //const start = 0;
        const end = 20534862392784 * 8 + 256;

        let last = 0;
        for(let i = start; i < end; i += 1) {
            const computer = parseInput(input);
            computer.a = i;
            run(computer);
            const result = computer.out.join(",");
          //                 2,4,1,1,7,5,1,5,4,3,5,5,0,3,3,0
            if (result.endsWith("4,1,1,7,5,1,5,4,3,5,5,0,3,3,0")) {
                console.log(i + ": " + result, "distance to last: " + (i - last));
                last = i;
            }
        }


        //console.log(result)
    })

})