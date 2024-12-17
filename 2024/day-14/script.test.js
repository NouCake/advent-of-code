import fs from 'fs'
import { parseRobots, predicPosition } from './script';

const path = './2024/day-14';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 13 Script", () => {

    it("star1 example", () => {
        const robots = parseRobots(example);
        const dimensions = {width: 11, height: 7};

        expect(robots.length).toBe(12);
        expect(robots[0].position.x).toBe(0);
        expect(robots[0].position.y).toBe(4);

        expect(robots[10].position.x).toBe(2);
        expect(robots[10].position.y).toBe(4);

        expect(robots[10].velocity.x).toBe(2);
        expect(robots[10].velocity.y).toBe(-3);

        expect(predicPosition(dimensions, robots[10], 1)).toEqual({x: 4, y: 1});
        expect(predicPosition(dimensions, robots[10], 2)).toEqual({x: 6, y: 5});

        const map = "0".repeat(dimensions.height).split("").map(line => line.repeat(dimensions.width).split(""))
        const robotsAfter100 = robots
            .map(robot => predicPosition(dimensions, robot, 100));
        robotsAfter100.forEach(r => map[r.y][r.x] = Number.parseInt(map[r.y][r.x]) + 1);

        dimensions.width -= 1;
        dimensions.height -= 1;
        const topLeft = robotsAfter100
            .filter(r => r.x < dimensions.width * 0.5 && r.y < dimensions.height * 0.5);

        const topRight = robotsAfter100
            .filter(r => r.x > dimensions.width * 0.5 && r.y < dimensions.height * 0.5);

        const bottomLeft = robotsAfter100
            .filter(r => r.x < dimensions.width * 0.5 && r.y > dimensions.height * 0.5);

        const bottomRight = robotsAfter100
            .filter(r => r.x > dimensions.width * 0.5 && r.y > dimensions.height * 0.5);
        dimensions.width += 1;
        dimensions.height += 1;

        console.log(map.map(row => row.join("")).join("\n").replaceAll("0", "."));

        const result = topLeft.length * topRight.length * bottomLeft.length * bottomRight.length;
        expect(result).toBe(12);
    })

    it("star1", () => {
        const robots = parseRobots(input);
        const dimensions = {width: 101, height: 103};
        const robotsAfter100 = robots
            .map(robot => predicPosition(dimensions, robot, 100));

        dimensions.width -= 1;
        dimensions.height -= 1;
        const topLeft = robotsAfter100
            .filter(r => r.x < dimensions.width * 0.5 && r.y < dimensions.height * 0.5);

        const topRight = robotsAfter100
            .filter(r => r.x > dimensions.width * 0.5 && r.y < dimensions.height * 0.5);

        const bottomLeft = robotsAfter100
            .filter(r => r.x < dimensions.width * 0.5 && r.y > dimensions.height * 0.5);

        const bottomRight = robotsAfter100
            .filter(r => r.x > dimensions.width * 0.5 && r.y > dimensions.height * 0.5);
        dimensions.width += 1;
        dimensions.height += 1;

        const result = topLeft.length * topRight.length * bottomLeft.length * bottomRight.length;
        console.log(result)
    })

    it("star2 example", async () => {
        const robots = parseRobots(input);
        const dimensions = {width: 101, height: 103};

        for(let i = 0; i < 10000; i++) {
            const robotsAfter100 = robots.map(robot => predicPosition(dimensions, robot, i));
            
            let found = 0;
            robotsAfter100.forEach(r => {
                if(
                    robotsAfter100.find(r2 => r.x == r2.x - 1 && r.y == r2.y + 1) && 
                    robotsAfter100.find(r2 => r.x == r2.x + 1 && r.y == r2.y + 1) && 
                    robotsAfter100.find(r2 => r.x == r2.x - 2 && r.y == r2.y + 2) && 
                    robotsAfter100.find(r2 => r.x == r2.x + 2 && r.y == r2.y + 2) && 
                    robotsAfter100.find(r2 => r.x == r2.x - 3 && r.y == r2.y + 3) && 
                    robotsAfter100.find(r2 => r.x == r2.x + 3 && r.y == r2.y + 3)
                ) {
                    found++;
                }
            });

            if(found > 0) {
                const map = "0".repeat(dimensions.height).split("").map(line => line.repeat(dimensions.width).split(""))
                robotsAfter100.forEach(r => map[r.y][r.x] = Number.parseInt(map[r.y][r.x]) + 1);
                console.log("ATTEMPT " + i + "\n" + map.map(row => row.join("")).join("\n").replaceAll("0", "."));
            }
        }

        //fuck this shit

        //const result = topLeft.length * topRight.length * bottomLeft.length * bottomRight.length;
        //expect(result).toBe(12);
    })

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    it("star2", () => {
        const result = "skibidi2(input)";
        console.log(result)
    })

})