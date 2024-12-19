import fs from 'fs'
import { parseInput } from './script';
import { findShortestPath, printPath } from '../day-16/script';

const path = './2024/day-18';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 18 Script", () => {

    it("star1 example", () => {
        const bytes = parseInput(example);
        const dimension = {width: 7, heigh: 7};

        const paths = [];
        for(let x = 0; x < dimension.width; x++) {
            for(let y = 0; y < dimension.heigh; y++) {
                if(!bytes.find(b => b.x == x && b.y == y)) {
                    paths.push({x, y});
                }
            }
        }

        const result = findShortestPath({paths, start: {x: 0, y: 0}, end: {x: 6, y: 6}}, 0);
        console.log(printPath(result[0].path.map(e => paths[e]), bytes))
        expect(result[0].path.length).toBe(22);
    })

    it("star1 s", () => {
        const bytes = parseInput(input.split("\n").slice(0, 1024).join("\n"));
        expect(input.split("\n").slice(0, 1024).length).toBe(1024);
        const dimension = {width: 71, heigh: 71};

        const paths = [];
        for(let x = 0; x < dimension.width; x++) {
            for(let y = 0; y < dimension.heigh; y++) {
                if(!bytes.find(b => b.x == x && b.y == y)) {
                    paths.push({x, y});
                }
            }
        }

        const result = findShortestPath({paths, start: {x: 0, y: 0}, end: {x: 70, y: 70}}, 0);
        console.log(printPath(result[0].path.map(e => paths[e]), bytes))
        console.log(result[0].path.length)
    })

    it("star2 example", () => {
        const dimension = {width: 7, heigh: 7};
        const maxLength = example.split("\n").length;
        for(let i = 12; i < maxLength; i++) {
            const bytes = parseInput(example.split("\n").slice(0, i).join("\n"));
            const paths = [];
            for(let x = 0; x < dimension.width; x++) {
                for(let y = 0; y < dimension.heigh; y++) {
                    if(!bytes.find(b => b.x == x && b.y == y)) {
                        paths.push({x, y});
                    }
                }
            }
            const result = findShortestPath({paths, start: {x: 0, y: 0}, end: {x: 6, y: 6}}, 0);
            if(!result) {
                console.log("FOUND AT " + i);
                console.log( example.split("\n")[i-1])
                break;
            }
        }
    })

    it("star2 s", () => {
        const dimension = {width: 71, heigh: 71};
        const maxLength = input.split("\n").length;
        for(let i = 1024; i < maxLength; i++) {
            console.log("round", i)
            const bytes = parseInput(input.split("\n").slice(0, i).join("\n"));
            const paths = [];
            for(let x = 0; x < dimension.width; x++) {
                for(let y = 0; y < dimension.heigh; y++) {
                    if(!bytes.find(b => b.x == x && b.y == y)) {
                        paths.push({x, y});
                    }
                }
            }
            const result = findShortestPath({paths, start: {x: 0, y: 0}, end: {x: 70, y: 70}}, 0);
            if(!result) {
                console.log("FOUND AT " + i);
                console.log(input.split("\n")[i-1])
                break;
            }
        }
    })

})