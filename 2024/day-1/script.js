export function parseInput(input) {
    const leftList = [];
    const rightList = [];

    input.split("\n").forEach(line => {
        const split = line.trim().split("   ");
        leftList.push(Number.parseInt(split[0]));
        rightList.push(Number.parseInt(split[1]));
    });

    return {leftList, rightList};
}

export function listDifference(input) {
    const {leftList, rightList} = parseInput(input);

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    const differenceList = leftList.map((e, i) => Math.abs(e - rightList[i]));

    console.log(leftList, rightList, differenceList);
    return differenceList.reduce((agg, cur) => agg + cur, 0);
}

export function listSimilarity(input) {
    const {leftList, rightList} = parseInput(input);

    const similarityList = leftList.map((e, i) => {
        const count = rightList.reduce((agg, cur) => {
            return cur == e ? agg + 1 : agg
        }, 0);
        return e * count;
    });

    const sum = similarityList.reduce((agg, cur) => agg + cur, 0);
    return sum;
}