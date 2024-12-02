export function AAAAAAAAAAAAAAAAAAAA(allCards, cardId) {
    const card = getCardById(allCards, cardId)
    
    let nextIds = card.matching.map((_, index) => card.id + index + 1)
    return [cardId, ...nextIds.map(id => AAAAAAAAAAAAAAAAAAAA(allCards, id))].flat()
}

export function getCardById(allCard, id) {
    return allCard.find(e => e.id === id)
}

export function getWinngCopyIds(card) {
    const copyIds = [];
    for (let i = 1; i <= card.matching.length; i++) {
        copyIds.push(card.id + i)
    }
    return copyIds
}

export function parseCard(cardLine) {
    const card = {}

    card.id = Number.parseInt(cardLine.split(":")[0].match(/[0-9]+/)[0])
    const numbers = cardLine.split(":")[1].split("|")
    card.winningNumbers = numbers[0].trim().split(" ")
        .filter(e => e)
        .map(e => Number.parseInt(e));

    card.yourNumbers = numbers[1].trim().split(" ")
        .filter(e => e)
        .map(e => Number.parseInt(e));

    card.matching = card.winningNumbers.filter(num => card.yourNumbers.includes(num))
    card.matching.score = card.matching.length <= 0 ? 0 : Math.pow(2, card.matching.length - 1);

    card.winningCopys = getWinngCopyIds(card);
    
    return card;
}

import fs from 'fs'
function star1() {
    const input = fs.readFileSync('./day-4/input.txt', 'utf8');
    const cardLines = input.split("\n");
    const cards = cardLines.map(parseCard)

    const sum = cards.reduce((agg, cur) => {
        return agg + cur.matching.score
    }, 0)
    console.log(sum)
}


function star2() {
    const input = fs.readFileSync('./day-4/input.txt', 'utf8');
    const cardLines = input.split("\n");
    const cards = cardLines.map(parseCard)

    let hm = cards.map(c => AAAAAAAAAAAAAAAAAAAA(cards, c.id)).flat()
    console.log(hm.length)
}

star2()