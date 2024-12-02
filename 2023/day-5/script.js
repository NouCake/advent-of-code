
export function parseRule(ruleLine) {
    const groups = ruleLine.match(/[0-9]+/g)
    return {
        destination: Number.parseInt(groups[0]), 
        source: Number.parseInt(groups[1]), 
        range: Number.parseInt(groups[2]), 
    }
}

export function parseBlock(block) {
    const lines = block.split("\n").slice(1)
    return lines.map(parseRule)
}


export function parseBrosure(brosure) {
    const blocks = brosure.split("\n\n")
    const seeds = blocks[0].match(/[0-9]+/g).map(e => Number.parseInt(e))

    const rules = blocks.slice(1).map(parseBlock)
    return {
        seeds, rules
    }
}

export function createConversionMap(rules) {
    return (sourceId) => {
        for (const {source, destination, range} of rules) {
            if (sourceId >= source && sourceId < source + range) {
                //console.log("Converting " + sourceId + " > " + (destination + (sourceId - source)), {source, destination, range})
                return destination + (sourceId - source)
            }
        }
        return sourceId
    }
}

export function convertRangeWithRule({start, end}, {source, destination, range}) {
    const result = {
        converted: [],
        unconverted: []
    }
    const ruleStart = source;
    const ruleEnd = source + range;

    const nextStart = Math.max(start, ruleStart)
    const nextEnd = Math.min(end, ruleEnd);

    if (nextStart >= nextEnd) {
        result.unconverted.push({start, end})
        return result;
    }

    if (nextStart !== start && nextStart) {
        result.unconverted.push({start, end: nextStart})
    }

    if (nextEnd !== end) {
        result.unconverted.push({start: nextEnd, end})
    }

    const offset = nextStart - ruleStart;
    if (ruleStart < ruleEnd) {
        result.converted.push({start: destination + offset, end: destination + offset + (nextEnd - nextStart) })
    }

    return result;
}

export function createRangeConversionMap(rules) {
    return function(ranges) {
        let unconverted = ranges;
        const converted = [];

        rules.forEach(rule => {
            //console.log("Using rule:", rule)
            const nextUnconverted = []
            
            unconverted.forEach(r => {
                const result = convertRangeWithRule(r, rule)
                //console.log("Converting", r, "to", result.converted, "leaving", result.unconverted)
                result.converted.forEach(e => converted.push(e))
                result.unconverted.forEach(e => nextUnconverted.push(e))
            })
            
            unconverted = nextUnconverted
        })

        return converted.concat(unconverted)
    }
}

import fs from 'fs'
function star1() {
    const input = fs.readFileSync('./day-5/input.txt', 'utf8')

    const {seeds, rules} = parseBrosure(input)
    const converter = createConversionMap(rules)

    const result = seeds.map(seed => {
        let next = seed;

        let logLine = "Converting Seed " + seed;
        for (const conv of converter) {
            next = conv(next)
            logLine += " > " + next;
        }

        //console.log(logLine)
        return next
    }).sort((a, b) => a-b)

    console.log(result)
}

function convertSeed(seed, converter) {
    let next = seed;
    for (const conv of converter) {
        const last = next;
        next = conv(next)
        console.log("Converted", last, "to", next)
    }
    return next
}

export function star2() {
    const input = fs.readFileSync('./day-5/input.txt', 'utf8')

    const {seeds, rules} = parseBrosure(input)
    const converter = rules.map(createRangeConversionMap)
    
    const startTime = Date.now()
    let minConvertedValue = Number.MAX_VALUE;
    let index = 0;

    const resultRanged = []
    for (let i = 0; i < seeds.length; i += 2) {
        const start = seeds[i];
        const end = start + seeds[i+1];
        console.log("Start looking up seeds from", start, "to", end)

        const range = {start, end}
        resultRanged.push(convertSeed([range], converter))
    }
    console.log("Final Result: ", resultRanged.flat().sort((a,b) => (a.start - b.start)))
    
    const result = minConvertedValue;
    console.log(result, "Took " + ((Date.now() - startTime) / 1000) + "s")
}