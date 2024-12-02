import fs from 'fs'

export function parseConfiguration(line) {
    const splits = line.split(" ")


    const springs = parseSprings(splits[0])
    const damaged = splits[1].split(",").map(e => Number.parseInt(e))

    return {line, springs, damaged}
}

function parseSprings(springLine) {
    const springs = []
    let lastChar = springLine[0];
    let length = 0;
    for (let i in springLine) {
        const c = springLine[i];
        if(c != lastChar) {
            springs.push({char: lastChar, length, start: i - length})
            length = 0;
        }
        length++;
        lastChar = c;
    }
    springs.push({char: lastChar, length, start: springLine.length - length})
    return springs;
}

export function isConfigurationCorrect(configuration) {
    const damaged = configuration.springs.filter(e => e.char == "#")
    if (damaged.length !== configuration.damaged.length) {
        return false
    }
    for (let i = 0; i < configuration.damaged.length; i++) {
        const curExpected = configuration.damaged[i]
        if (damaged[i].length !== curExpected) {
            return false;
        }
    }
    return true;
}

export function countPossibleConfigurations(configuration) {
    const unknownSprings = configuration.springs.filter(e => e.char == "?")

    const numberOfUnknown = unknownSprings.reduce((agg, cur) => agg + cur.length, 0);
    const maxPossibilities = Math.pow(2, numberOfUnknown)

    const binaryLength = maxPossibilities.toString(2).length-1;
    let possible = 0;
    for(let i = 0; i < maxPossibilities; i++) {
        const binary = i.toString(2).padStart(binaryLength, "0");
        let line = configuration.line;
        for(const c of binary) {
            line = line.replace("?", c == 0 ? "." : "#")
        }
        if (isConfigurationCorrect(parseConfiguration(line))) {
            possible++
        }
    }
    
    return possible;
}

export function canPlace(segment, length) {
    if(segment[length] == "#") return false;
    if(segment.substring(0, length).includes(".")) return false;

    return true;
}

const cach = {}
let cachHits = 0;
let cachQuery = 0;
export function findPossiblePlacements(line, placementLength) {
    cachQuery++;
    const cachKey = line + "@" + placementLength
    if (cach[cachKey]) {
        cachHits++
        if(cachHits % 100_000 == 0) {
            //console.log("Cach Hits", cachHits)
        }
        return cach[cachKey];
    }

    const possibiles = [];

    for(let i = 0; i <= line.length - placementLength; i++) {
        const char = line[i];
        if (char == ".") continue;
        if (char == "#") {
            if (canPlace(line.substring(i, i + placementLength + 1), placementLength)) {
                possibiles.push(i)
            }
            return possibiles;
        }
        if (char == "?") {
            if (canPlace(line.substring(i, i + placementLength + 1), placementLength)) {
                possibiles.push(i)
            }
        }
    }

    cach[cachKey] = possibiles;
    return possibiles;
}

const pCach = {}
let pHit = 0;
export function findPossibleForAll(line, blocks, lol) {
    const cachKey = line + blocks.join(",")
    if(pCach[cachKey]){
        pHit ++;
        if(pHit % 100 == 0) {
            console.log("P Cach Hit", pHit)
        }
        return pCach[cachKey]
    }

    lol = lol || ""
    if(blocks.length == 0) {
        return line.includes("#") ? 0 : 1;
    }

    let possibillities = findPossiblePlacements(line, blocks[0]);
    let possible = 0;
    possibillities.forEach(pos => {
        let ll = line.substring(0, pos) + "".padStart(blocks[0], "#") + "."
        possible += findPossibleForAll(line.substring(pos + blocks[0] + 1), blocks.slice(1), lol + ll)

    })

    pCach[cachKey] = possible
    return possible;
}