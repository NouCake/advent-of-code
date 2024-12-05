export function parseInput(input) {
    const splits = input.split('\n\n');

    const rules = parseRules(splits[0]);
    const printOrders = parsePrintOrders(splits[1]);
    return { rules, printOrders }
}

export function applyRules(rules, printOrders) {
    return printOrders.filter(printOrder => {
        return isValid(printOrder, rules);
    });
}

export function isValid(printOrder, rules) {
    const applicable = findApplicableRules(rules, printOrder);
    for(const rule of applicable) {
        if (!applyRule(rule, printOrder)) {
            return false;
        }
    }
    return true;
}

export function sortPrintOrder(printOrder, rules) {
    const applicable = findApplicableRules(rules, printOrder);

    for(const rule of applicable) {
        if (!applyRule(rule, printOrder)) {
            const firstIndex = printOrder.indexOf(rule[0]);
            const secondIndex = printOrder.indexOf(rule[1]);
            const temp = printOrder[firstIndex];
            printOrder[firstIndex] = printOrder[secondIndex];
            printOrder[secondIndex] = temp;
        }
    }
    return printOrder;
}

export function applyRule(rule, printOrders) {
    const firstIndex = printOrders.indexOf(rule[0]);
    const secondIndex = printOrders.indexOf(rule[1]);

    return firstIndex < secondIndex;
}

export function findApplicableRules(rules, printOrder) {
    return rules.filter(rule => {
        if (printOrder.includes(rule[0]) && printOrder.includes(rule[1])) {
            return true;
        }
        return false;
    });
}

function parsePrintOrders(input) {
    return input.split('\n').map(line => {
        return line.split(',').map(e => Number.parseInt(e))
    });
}

function parseRules(input) {
    return input.split('\n').map(line => {
        return line.split('|').map(e => Number.parseInt(e))
    });
}