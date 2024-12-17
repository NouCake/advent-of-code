export function parseCraneConfiguration(input) {
    const lines = input.split('\n');

    return {
        a: {
            x: Number.parseInt(lines[0].substring(lines[0].indexOf("X+")+2, lines[0].indexOf("X+")+4)),
            y: Number.parseInt(lines[0].substring(lines[0].indexOf("Y+")+2, lines[0].indexOf("Y+")+4)),
        },
        b: {
            x: Number.parseInt(lines[1].substring(lines[1].indexOf("X+")+2, lines[1].indexOf("X+")+4)),
            y: Number.parseInt(lines[1].substring(lines[1].indexOf("Y+")+2, lines[1].indexOf("Y+")+4)),
        },
        prize: {
            x: Number.parseInt(lines[2].substring(lines[2].indexOf("X=")+2, lines[2].indexOf(","))),
            y: Number.parseInt(lines[2].substring(lines[2].indexOf("Y=")+2)),
        }
    }
}

export function parseInput(input) {
    const blocks = input.split('\n\n');

    return blocks.map(e => parseCraneConfiguration(e));
}

export function findMinTokens(config, tokenCostA = 3, tokenCostB = 1) {
    for(let i = 0; i < 100; i++) {
        let aPressesX = i * config.a.x;
        const aPressesY = i * config.a.y;
        const distToPrize = config.prize.x - aPressesX;
        if (distToPrize < 0) {
            break;
        }
        const bPresses = (distToPrize / config.b.x);
        if (bPresses % 1 !== 0) {
            continue;
        }
        const bPressesX = bPresses * config.b.x;
        const bPressesY = bPresses * config.b.y;

        if(bPressesX + aPressesX === config.prize.x && bPressesY + aPressesY === config.prize.y) {
            return i * tokenCostA + bPresses * tokenCostB;
        }
    }
}

export function findMinTokens2(config, tokenCostA = 3, tokenCostB = 1) {
    config = {a:config.a, b:config.b, prize: {x: config.prize.x + 10000000000000, y: config.prize.y + 10000000000000}};

    const maxBPresses = Math.floor(Math.min(config.prize.x / config.b.x, config.prize.y / config.b.y));

    for(let i = 0; i < 10000; i++) {
        const bPresses = maxBPresses - i;

        const bPressesX = bPresses * config.b.x;
        const bPressesY = bPresses * config.b.y;

        const leftoverX = config.prize.x - bPressesX;

        const aPresses = leftoverX / config.a.x;
        if (aPresses % 1 !== 0) {
            continue;
        }

        const aPressesX = aPresses * config.a.x;
        const aPressesY = aPresses * config.a.y;

        if (aPressesX + bPressesX === config.prize.x && aPressesY + bPressesY === config.prize.y) {
            return aPresses * tokenCostA + bPresses * tokenCostB;
        }
    }
}