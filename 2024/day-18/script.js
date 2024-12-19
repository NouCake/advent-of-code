export function parseInput(input) {
    return input.split('\n').map(line => ({x: Number.parseInt(line.split(',')[0]), y: Number.parseInt(line.split(',')[1])}));
}