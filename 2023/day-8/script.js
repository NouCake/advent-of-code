const gcd = (a, b) => a ? gcd(b % a, a) : b;

export const lcm = (a, b) => a * b / gcd(a, b);

export function parseInput(input) {
    const blocks = input.split("\n\n")
    return {
        turns: parseTurns(blocks[0]),
        map: parseMap(blocks[1])
    }
}

export function parseTurns(turnLine) {
    return turnLine
}

export function calcNumberOfTuns(map, turns, start, goal) {
    let steps = 0;
    let current = map[start];

    while (!goal.includes(current.element)) {
        const turnChar = turns[steps%turns.length]
        const direction = turnChar == "L" ? "left" : "right"
        const nextElement = current[direction];
        current = map[nextElement]
        steps++;
    }
    return steps;
}

export function parseMap(mapBlock) {
    const lines = mapBlock.split("\n")
    const map = {}
    lines.forEach(line => {
        const elements = line.match(/[A-Z]+/g)
        map[elements[0]] = {
            element: elements[0],
            left: elements[1],
            right: elements[2],
        }
    })
    return map
}