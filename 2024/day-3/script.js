export function getResult(input) {
    let sum = 0;
    for(const match of input.matchAll(/(mul\(\d{0,3},\d{0,3}\))/g)) {
        const splits = match[0].split(',');
        const a = Number.parseInt(splits[0].replace('mul(', ''));
        const b = Number.parseInt(splits[1].replace(')', ''));
        sum += a * b;
    }
    return sum;
}

export function removeDonts(input, i = 0) {
    try {
        const start = input.indexOf("don't()")
        if (start == -1) {
            return input;
        }
        let end = input.indexOf("do()");
        while (end != -1 && end < start) {
            end = input.indexOf("do()", end + 1);
        }

        if (end == -1) {
            return removeDonts(input.substring(0, start), i + 1);
        }

        return removeDonts(input.substring(0, start) + input.substring(end + 4), i+1);
    } catch(e) {
        console.log(input.length, i)
        throw e;
    }
}