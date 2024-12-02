import fs from 'fs'

export function parseHand(hand, jokerRule) {
    const parsed = {};
    let jokers = 0;
    for(const card of hand) {
        if (jokerRule && card == "J") {
            jokers++;
            continue;
        }
        parsed[card] = parsed[card] ? parsed[card] + 1 : 1
    }

    if(jokers == 5) {
        parsed["J"] = 0
    }

    const sorted = Object.values(parsed).sort().reverse();
    sorted[0] += jokers
    return sorted;
}

export function getCardValue(card, useJokers) {
    if(card == "T") return 10
    if(card == "J") return useJokers ? 1 : 11
    if(card == "Q") return 12
    if(card == "K") return 13
    if(card == "A") return 14

    return Number.parseInt(card)
}

export function compareHighestCard(one, two, useJokers) {
    for(let i = 0; i < one.length; i++) {
        const a = one[i]
        const b = two[i]

        if(a == b) continue
        return getCardValue(a, useJokers) - getCardValue(b, useJokers)
    }
    throw "DIS IS NOT DEFINED"
}

export function compareHands(one, two, useJokers) {
    const parsedOne = parseHand(one.hand, useJokers);
    const parsedTwo = parseHand(two.hand, useJokers);

    const highestOne = parsedOne[0];
    const highestTwo = parsedTwo[0];

    const highest = Math.max(highestOne, highestTwo);

    const isFullHouseOne = parsedOne[0] === 3 && parsedOne[1] === 2
    const isFullHouseTwo = parsedTwo[0] === 3 && parsedTwo[1] === 2

    one.highest = isFullHouseOne ? "f" : highestOne
    two.highest = isFullHouseTwo ? "f" : highestTwo

    if (highest == 3) {

        if (isFullHouseOne && isFullHouseTwo) {
            // do nothing
        } else if(isFullHouseOne || isFullHouseTwo) {
            return isFullHouseOne ? 1 : -1
        }
    }

    if(highest == 2) {
        const nextOne = parsedOne[1]
        const nextTwo = parsedTwo[1]

        if(nextOne == 2 && nextTwo == 2) {
            // do nothing
        } else if (nextOne == 2 || nextTwo == 2) {
            return nextOne == 2 ? 1 : -1
        }
    }

    if (highestOne == highestTwo) {
        return compareHighestCard(one.hand, two.hand, useJokers)
    }
    
    return highestOne - highestTwo
}