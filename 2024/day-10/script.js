
export function parseMap(input) {
    return input.split('\n').map(row => row.split('').map(e => Number.parseInt(e)));
}

export function findTrailheads(map) {
    const trailheads = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                trailheads.push({ x, y });
            }
        }
    }
    return trailheads;
}

export function findTrails(map) {
    const trailheads = findTrailheads(map);

    const trails = [];

    const toSearch = trailheads.map(e => [e]);
    

    while(toSearch.length > 0) {
        const currentTrail = toSearch.pop();
        const next = findNextStep(map, currentTrail[currentTrail.length-1], currentTrail.length);
        next.forEach(steps => {
            const newTrail = [...currentTrail, steps];
            if (newTrail.length !== 10) {
                toSearch.push(newTrail);
            } else {
                trails.push(newTrail);
            }
        })
    }

    return trails;
}

export function countUniqueTrails(trails) {

    const uniuqeTrails = new Set(trails.map(trail => [trail[0], trail[trail.length-1]])
    .map(e => JSON.stringify(e)));
    return uniuqeTrails.size;
}

export function findNextStep(map, {x, y}, nextValue) {
    const steps = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
    ];
    let found = [];
    for (const step of steps) {
        if (map[step.y] && map[step.y][step.x] === nextValue) {
            found.push(step);
        }
    }
    return found;
}