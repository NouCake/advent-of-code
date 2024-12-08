export function parseEquations(input) {
    return input
        .split("\n")
        .map(line => {
            const splits = line.split(": ")
            return {
                result: Number.parseInt(splits[0]),
                operands: splits[1].split(' ').map(e => Number.parseInt(e))
            }
        })
}

export function isSolveable({ result, operands}) {
    for(let i = 0; i < Math.pow(2, operands.length - 1); i++) {
        let sum = operands[0];
        for(let y = 1; y < operands.length; y++) {
            if (i & Math.pow(2, y - 1)) {
                sum += operands[y]
            } else {
                sum *= operands[y]
            }
        }
        if (sum === result) {
            return true;
        }
    }

    return false;
}

export function isAlsoSolvable({ result, operands}) {
    for(let i = 0; i < Math.pow(3, operands.length - 1); i++) {
        let sum = operands[0];
        let equationString = result + " = " + operands[0];
        for(let y = 1; y < operands.length; y++) {
            const operation = Math.floor(i / Math.pow(3, y-1)) % 3;
            if (operation === 0) {
                sum += operands[y]
                equationString += " + " + operands[y]
            } else if (operation === 1) {
                sum *= operands[y]
                equationString += " * " + operands[y]
            } else {
                sum = Number.parseInt(sum + "" + operands[y])
                equationString += " | " + operands[y]
            }
        }
        if (sum === result) {
            return true;
        }
    }

    return false;
}