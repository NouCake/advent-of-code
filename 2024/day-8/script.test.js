import fs from 'fs'
import { filterDuplicateNodes, filterOutsideMap, findAllAntiNodes, findAntiNodes, parseMap } from './script';

const path = './2024/day-8';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 7 Script", () => {

    it("star1 example", () => {
        const map = parseMap(example);
        expect(Object.keys(map).length).toBe(2);
        expect(Object.keys(map['A']).length).toBe(3);
        expect(Object.keys(map['0']).length).toBe(4);
        expect(findAntiNodes(map['A']).length).toBe(6);

        const antiNodes = Object.keys(map)
            .map(frequency => {
                return findAntiNodes(map[frequency]);
            })
            .flat();
        expect(antiNodes.length).toBe(18);
        expect(filterOutsideMap(antiNodes, example).length).toBe(15);
        
        const result = filterDuplicateNodes(filterOutsideMap(antiNodes, example)).length;
        expect(result).toBe(14);
    })

    it("star1", () => {
        const map = parseMap(input);
        const antiNodes = Object.keys(map)
            .map(frequency => {
                return findAntiNodes(map[frequency]);
            })
            .flat();
        const result = filterDuplicateNodes(filterOutsideMap(antiNodes, input)).length;
        console.log(result)
    })

    it("star2 example", () => {
        const map = parseMap(example);
        const mapWidth = example.split("\n").length;
        const antiNodes = Object.keys(map)
            .map(frequency => {
                return findAllAntiNodes(map[frequency], mapWidth);
            })
            .flat();
        Object.values(map).forEach(antenas => {
            antenas.forEach(antena => {
                antiNodes.push(antena);
            })
        })
        const result = filterDuplicateNodes(filterOutsideMap(antiNodes, example)).length;

        // const testMap = example.split("\n").map(e => e.split(""));
        // antiNodes.forEach(node => {
        //     testMap[node.y][node.x] = "#";
        // })
        // console.log(testMap.map(e => e.join("")).join("\n"))

        expect(result).toBe(34);
    })

    it("star2", () => {
        const map = parseMap(input);
        const mapWidth = input.split("\n").length;
        const antiNodes = Object.keys(map)
            .map(frequency => {
                return findAllAntiNodes(map[frequency], mapWidth);
            })
            .flat();

        Object.values(map).forEach(antenas => {
            antenas.forEach(antena => {
                antiNodes.push(antena);
            })
        })
        const result = filterDuplicateNodes(filterOutsideMap(antiNodes, input)).length;
        console.log(result)
    })

})