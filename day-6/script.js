import fs from 'fs'

export function parseRace(raceInput) {
    const race = {}

    const lines = raceInput.split("\n")
    race.time = lines[0].match(/[0-9]+/g).map(e => Number.parseInt(e))
    race.distance = lines[1].match(/[0-9]+/g).map(e => Number.parseInt(e))

    return race
}

export function toCoolerRace(races) {
    races = races.time.map((time, index) => {
        return {
            time,
            distance: races.distance[index]
        }
    });
    return races;
}

export function calculateResultFromSolution(solutions) {
    return solutions.reduce((agg, cur) => agg * cur, 1)
}

export function getDistanceTable(time) {
    const table = []
    for (let i = 0; i <= time; i++) {
        table[i] = calculateDistance(time, i)
    }
    return table;
}

export function calculateDistance(time, pressed) {
    return pressed * (time - pressed);
}

export function numOfWinsByIndex(time, index) {
    return ((time / 2) - index) * 2 + 1
}

export function getMinWin(time, distance) {
    let lastDownTime = Math.floor(time / 2)

    for (let i = 1; i < Math.sqrt(time); i++) {
        let newDistance = calculateDistance(time, lastDownTime);
        const step = Math.floor(time / Math.pow(2, i+1))
        if (newDistance > distance) {
            lastDownTime -= step
        } else {
            lastDownTime += step
        }
    }

    if (calculateDistance(time, lastDownTime) < distance) {
        lastDownTime++;
    }
    
    return lastDownTime;
}

export function calculateNumberOfWins(time, distance) {
    const table = getDistanceTable(time)
    return table.filter(e => e > distance).length;
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