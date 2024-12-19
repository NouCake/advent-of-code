export function parseInput(input) {
    const blocks = input.split('\n\n');

    const registerBlock = blocks[0].split("\n");
    const registerA = registerBlock[0].split(": ")[1];
    const registerB = registerBlock[1].split(": ")[1];
    const registerC = registerBlock[2].split(": ")[1];

    const instructions = blocks[1].split(": ")[1].split(",")
        .map(instruction =>  Number.parseInt(instruction)); 

    return {
        a: Number.parseInt(registerA),
        b: Number.parseInt(registerB),
        c: Number.parseInt(registerC),
        instructions,
        out: [],
        pointer: 0,
    }
}

export function translateOpCode(code) {
    switch(code) {
        case 0: return "adv";
        case 1: return "bxl";
        case 2: return "bst";
        case 3: return "jnz";
        case 4: return "bxc";
        case 5: return "out";
        case 6: return "bdv";
        case 7: return "cdv";
    }
    throw new Error(`Unknown opcode ${code}`);
}

export function run(computer) {
    while (computer.pointer < computer.instructions.length) {
        doOperation(computer);
        computer.pointer += 2;
    }
    return computer;
}

export function doOperation(computer) {
    const instruction = computer.instructions[computer.pointer];
    const operand = computer.instructions[computer.pointer + 1];
    switch(instruction) {
        case 0: return opAdv(operand, computer);
        case 1: return opBxl(operand, computer);
        case 2: return opBst(operand, computer);
        case 3: return opJnz(operand, computer);
        case 4: return opBxc(operand, computer);
        case 5: return opOut(operand, computer);
        case 6: return opBdv(operand, computer);
        case 7: return opCdv(operand, computer);
    }

    throw new Error(`Unknown opcode ${instruction}`);
}

function adv(operand, computer) {
    const numerator = computer.a;
    const denominator = Math.pow(2, getOperandValue(operand, computer));
    const result = Math.floor(numerator / denominator)
    if(result < 0) throw new Error(`Negative division ${numerator} / ${denominator}`);
    return result;
}

function opAdv(operand, computer) {
    computer.a = adv(operand, computer);
}

function opBdv(operand, computer) {
    computer.b = adv(operand, computer);
}

function opCdv(operand, computer) {
    computer.c = adv(operand, computer);
}

function opOut(operand, computer) {
    const value = getOperandValue(operand, computer);
    computer.out.push(value % 8);
}

function opBst(operand, computer) {
    const value = getOperandValue(operand, computer) % 8;
    computer.b = value;
}

function opBxc(operand, computer) {
    computer.b = Number(BigInt(computer.b) ^ BigInt(computer.c));
}

function opBxl(operand, computer) {
    computer.b = computer.b ^ operand;
}

function opJnz(operand, computer) {
    if (computer.a == 0) {
        return;
    }
    computer.pointer = operand - 2;
}

function getOperandValue(operand, computer) {
    if (operand <= 3) {
        return operand;
    }
    if (operand == 4) {
        return computer.a;
    }
    if (operand == 5) {
        return computer.b;
    }
    if (operand == 6) {
        return computer.c;
    }
    throw new Error(`Unknown operand ${operand}`);
}

export function findInputForOut(out) {
    let value = 0;
    out.reverse().forEach((digit, index) => {
        value += digit;
        value *= 8;
    });
    return value;
}