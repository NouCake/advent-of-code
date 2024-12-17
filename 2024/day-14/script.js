export function parseRobots(input) {
    return input.split('\n').map(line => {
        const splits = line.split(" ");

        const posSplits = splits[0].substring(2).split(",");
        const position = {x: parseInt(posSplits[0]), y: parseInt(posSplits[1])};

        const velSplits = splits[1].substring(2).split(",");
        const velocity = {x: parseInt(velSplits[0]), y: parseInt(velSplits[1])};

        return { position, velocity };
    });
}

export function predicPosition({width, height}, robot, time) {
    return {
        x: ((robot.position.x + robot.velocity.x * time) % width + width) % width,
        y: ((robot.position.y + robot.velocity.y * time) % height + height) % height
    }
}