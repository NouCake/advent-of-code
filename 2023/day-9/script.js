import fs from 'fs'

export function parseLine(line) {
    const values = line.split(" ").map(e => Number.parseInt(e))
}

export function caluclateDifferenceSequence(sequence) {
    const difSeq = [];
    for (let i = 1; i < sequence.length; i++) {
        difSeq.push(sequence[i] - sequence[i-1])
    }
    return difSeq
}

export function isZeroSequence(sequence) {
    return !sequence.find(e => e !== 0)
}

export function getDifSequences(sequence) {
    const difs = [sequence];
    let nextSequence = sequence;

    console.log(nextSequence);
    while (!isZeroSequence(nextSequence)) {
        nextSequence = caluclateDifferenceSequence(nextSequence)
        difs.push(nextSequence);
    }

    return difs;

}

export function extrapolate(sequence) {
    const difs = getDifSequences(sequence);
    difs[difs.length-1].push(0)

    for (let i = difs.length-2; i >= 0; i--) {
        const one = difs[i]
        const two = difs[i+1]

        one.push(one[one.length-1] + two[two.length-1]);
    }

    console.log(difs)
    return difs[0][difs[0].length-1];
}

export function extrapolate_back(sequence) {
    return extrapolate(sequence.reverse())
}