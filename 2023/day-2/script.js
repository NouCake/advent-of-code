import fs from 'fs'

export function parseRound(roundLine) {
    const round = {red: 0, green: 0, blue: 0}
    const cubeSplits = roundLine.split(",")

    cubeSplits.forEach(e => {
        const color = e.replaceAll(/[0-9]/g, "").trim();
        const number = e.match(/[0-9]+/)[0]

        round[color] = Number.parseInt(number);
    })
    return round;
}

export function sumGameIds(games) {
    return games.reduce((agg, cur) => agg + cur.id, 0)
}

export function getMaxInRound(rounds, color) {
    return rounds.sort((a, b) => b[color]-a[color])[0][color]
}

export function isGamePossible(game, {red, green, blue}) {
    const maxRed = getMaxInRound(game.rounds, "red");
    const maxGreen = getMaxInRound(game.rounds, "green");
    const maxBlue = getMaxInRound(game.rounds, "blue");
    
    return maxRed <= red && maxGreen <= green && maxBlue <= blue
}

export function parseGame(gameLine) {
    const game = {};
    
    const idSplit = gameLine.split(":");
    game.id = Number.parseInt(idSplit[0].match(/([0-9]+)/)[0])

    const roundSplits = idSplit[1].split(";")
    game.rounds = roundSplits.map(parseRound)

    return game;
}

export function calculatePower(game) {
    const maxRed = getMaxInRound(game.rounds, "red");
    const maxGreen = getMaxInRound(game.rounds, "green");
    const maxBlue = getMaxInRound(game.rounds, "blue");

    return maxRed * maxGreen * maxBlue;
}

function run1 () {
    const input = fs.readFileSync('./day-2/input.txt', 'utf8');
    const lines = input.split('\n');

    const games = lines
        .map(line =>  parseGame(line))
    
    const filteredGames = games.filter(game => isGamePossible(game, {red: 12, green: 13, blue: 14}))

    fs.writeFileSync("./day-2/output.txt", games.map((g, i) => {
        let str = g.id;
        g.rounds.forEach(round => {
            str += ` [r${round.red}|g${round.green}|b${round.blue}]`
        })
        str += " " + isGamePossible(g, {red: 12, green: 13, blue: 14})
        str += "\n" + lines[i] + "\n"
        return str;
    }).join("\n"))

    const sum = sumGameIds(filteredGames)

    console.log(sum);
}

function run2() {
    const input = fs.readFileSync('./day-2/input.txt', 'utf8');
    const lines = input.split('\n');

    const games = lines
        .map(line =>  parseGame(line))
        .map(game => calculatePower(game))
        

    const sum = games.reduce((acc, cur) => acc + cur, 0)

    console.log(sum);
}

run2()