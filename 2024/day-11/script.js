export function rule1(stoneValue) {
    if (stoneValue == 0) {
        return [1]
    }
}

export function rule2(stoneValue) {
    const strValue = ""+stoneValue
    if (strValue.length % 2 == 0) {
        return [
            Number.parseInt(strValue.substring(0, strValue.length / 2)),
            Number.parseInt(strValue.substring(strValue.length / 2)),
        ]
    }
}

export function ruleDefault(stoneValue) {
    return [stoneValue * 2024]
}

export function blink(stones) {
    let newStones = [];
    stones.forEach(s => {
        let next = rule1(s);
        if (!next) next = rule2(s);
        if (!next) next = ruleDefault(s);
        newStones.push(...next)
    })
    return newStones;
}

const blinkCache = {};
function cacheBlink(stoneValue, blinkingTimes, result) {
    blinkCache[stoneValue] = blinkCache[stoneValue] || [];
    blinkCache[stoneValue][blinkingTimes] = result;
}

function getCacheValue(stoneValue, max) {
    if(!blinkCache[stoneValue]) {
        return;
    }
    const cache = blinkCache[stoneValue];
    return cache[Math.min(cache.length-1, max)];
}

export function blinkCached(stones, times) {
    const toBlink = stones.map(e => ({value: e, remaining: times}))

    let total = 0;
    while(toBlink.length > 0) {
        const cur = toBlink.pop();
        blink([cur.value]).forEach(s => {
            if (cur.remaining <= 1) {
                total++;
            } else {
                toBlink.push({value: s, remaining: cur.remaining-1})
            }
        })
    }
    return total;
}


export function blinkMultiple(stones, times) {
    
    for(let i = 0; i < times; i++) {
        //console.time("Blink " + i)
        stones = blink(stones);
        //console.timeEnd("Blink " + i)
        //console.log(stones.length)
    }
    return stones
}

export function parseStones(input) {
    return input.split(" ").map(e => Number.parseInt(e));
}

export function parseStonesMap(input) {
    const map = {}
    input.split(" ")
        .map(e => Number.parseInt(e))
        .forEach(num => map[num] = (map[num] || 0) + 1);
    return map;
}

export function blinkMap(map) {
    const newMap = {};
    Object.keys(map).forEach(num => {
        num = Number.parseInt(num);
        blink([num]).forEach(s => {
            newMap[s] = (newMap[s] || 0) + map[num]
        })
    })
    return newMap;
}


export function blinkMapMultiple(stones, times) {
    let next = stones;
    for(let i = 0; i < times; i++) {
        next = blinkMap(next);
    }
    return next
}