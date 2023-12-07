import fs from 'fs'

export function parseHand(hand) {
    const parsed = {};
    for(const card of hand) {
        parsed[card] = parsed[card] ? parsed[card] + 1 : 1
    }
    return Object.values(parsed).sort().reverse();
}

export function getCardValue(card) {
    if(card == "T") return 10
    if(card == "J") return 11
    if(card == "Q") return 12
    if(card == "K") return 13
    if(card == "A") return 14

    return Number.parseInt(card)
}

export function compareHighestCard(one, two) {
    for(let i = 0; i < one.length; i++) {
        const a = one[i]
        const b = two[i]

        if(a == b) continue
        return getCardValue(a) - getCardValue(b)
    }
    throw "DIS IS NOT DEFINED"
}

export function compareHands(one, two) {
    const parsedOne = parseHand(one);
    const parsedTwo = parseHand(two);

    const highestOne = parsedOne[0];
    const highestTwo = parsedTwo[0];

    const highest = Math.max(highestOne, highestTwo);

    if (highest == 3) {
        const isFullHouseOne = parsedOne[0] === 3 && parsedOne[1] === 2
        const isFullHouseTwo = parsedTwo[0] === 3 && parsedTwo[1] === 2

        if (isFullHouseOne && isFullHouseTwo) {
            // do nothing
        } else if(isFullHouseOne || isFullHouseTwo) {
            return isFullHouseOne ? 1 : -1
        }
    }

    if (highestOne == highestTwo) {
        return compareHighestCard(one, two)
    }
    
    return highestOne - highestTwo
}

function star1() {
    const input = fs.readFileSync('./day-template/input.txt', 'utf8')

    const result = "stuff"
    console.log(result)
}

function star2() {
    const input = fs.readFileSync('./day-template/input.txt', 'utf8')

    const result = "stuff"
    console.log(result)
}