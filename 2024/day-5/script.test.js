import fs from 'fs'
import { applyRules, findApplicableRules, isValid, parseInput, sortPrintOrder } from './script';

const path = './2024/day-5';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');

describe("Day 5 Script", () => {

    it("star1 example", () => {
        const { rules, printOrders } = parseInput(example);
        const validOrders = applyRules(rules, printOrders);
        const result = validOrders.reduce((acc, cur) => {
            return acc + cur[Math.floor(cur.length / 2)];
        }, 0);
        expect(result).toBe(143);
    })

    it("star1", () => {
        const { rules, printOrders } = parseInput(input);
        const validOrders = applyRules(rules, printOrders);
        const result = validOrders.reduce((acc, cur) => {
            return acc + cur[Math.floor(cur.length / 2)];
        }, 0);
        console.log(result)
    })

    it("star2 example", () => {
        const { rules, printOrders } = parseInput(example);
        const validOrders = applyRules(rules, printOrders);
        const invalidOrders = printOrders.filter(printOrder => !validOrders.includes(printOrder));
        const sorted = invalidOrders.map(printOrder => {
            let sortedOrder = printOrder;
            while(!isValid(sortedOrder, rules)) {
                sortedOrder = sortPrintOrder(sortedOrder, rules);
            }
            return sortedOrder;
        });
        const result = sorted.reduce((acc, cur) => {
            return acc + cur[Math.floor(cur.length / 2)];
        }, 0);
        expect(result).toBe(123);
    })

    it("star2", () => {
        const { rules, printOrders } = parseInput(input);
        const validOrders = applyRules(rules, printOrders);
        const invalidOrders = printOrders.filter(printOrder => !validOrders.includes(printOrder));
        const sorted = invalidOrders.map(printOrder => {
            let sortedOrder = printOrder;
            while(!isValid(sortedOrder, rules)) {
                sortedOrder = sortPrintOrder(sortedOrder, rules);
            }
            return sortedOrder;
        });
        const result = sorted.reduce((acc, cur) => {
            return acc + cur[Math.floor(cur.length / 2)];
        }, 0);
        console.log(result)
    })

})