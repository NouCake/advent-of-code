import path from "path";

class PriorityQueue{
    constructor(){
        this.values = [];
    }
    
    enqueue(node, priority){
        var flag = false;
        for(let i=0; i<this.values.length; i++){
            if(this.values[i].priority>priority){
                this.values.splice(i, 0, {node, priority})
                flag = true;
                break;
            }
        }
        if(!flag){
            this.values.push({node, priority})
        }
    }
    
    dequeue(){
        return this.values.shift()
    }
    
    size(){
        return this.values.length;
    }
}


export function parseInput(input) {
    let start, end;
    const paths = [];

    const lines = input.split('\n');
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if(char === 'S') {
                start = {x, y};
                paths.push(start)
            } else if(char === 'E') {
                end = {x, y};
                paths.push(end);
            } else if(char === '.') {
                paths.push({x, y});
            }
        }
    }

    return {start, end, paths}
}

export function findNeighbourPaths(paths, {x, y}) {
    return paths
        .map((_, index) => index)
        .filter(index => {
            const path = paths[index]
            return (path.x === x && (path.y === y - 1 || path.y === y + 1)) ||
                (path.y === y && (path.x === x - 1 || path.x === x + 1));
        });
}

export function rotationsFromDirection(current, target) {
    let num = 0;
    let tmp = {x: current.x, y: current.y};
    while(tmp.x !== target.x || tmp.y !== target.y) {
        num++;
        tmp = {x: -tmp.y, y: tmp.x};
        if(num > 4) {
            throw new Error('Invalid direction');
        }
    }
    return num % 2;
}

export function findShortestPath({paths, start, end}) {
    const startIndex = paths.findIndex(path => path == start);
    const toCheck = new PriorityQueue();
    const visited = {};
    visited[startIndex] = {cost: 0, rotation: {x: 1, y: 0}};
    toCheck.enqueue({ 
        curIndex: startIndex, 
        curRotation: {x: 1, y: 0}, 
        path: [startIndex], 
        cost: 0 
    }, 0);

    while(toCheck.size() > 0) {
        const cur = toCheck.dequeue().node;
        const curTile = paths[cur.curIndex];
        if (curTile.x == end.x && curTile.y == end.y) {
            return [cur];
        }
        const neighbours = findNeighbourPaths(paths, curTile);
        neighbours.forEach(neighbourIndex => {
            if(paths[neighbourIndex].x == curTile.x - cur.curRotation.x && paths[neighbourIndex].y == curTile.y - cur.curRotation.y) {
                return;
            }
            const next = copy(cur);
            const nextTile = paths[neighbourIndex];
            next.curIndex = neighbourIndex;
            next.path.push(next.curIndex);
            next.cost += 1;
            next.curRotation = {x: nextTile.x - curTile.x, y: nextTile.y - curTile.y};
            next.cost += 1000 * rotationsFromDirection(cur.curRotation, next.curRotation);

            if(visited[neighbourIndex] !== undefined && next.cost > visited[neighbourIndex].cost + rotationsFromDirection(next.curRotation, visited[neighbourIndex].rotation) * 1000) {
                //console.log(printPath(cur.path.map(e => paths[e])))
                return;
            }
            toCheck.enqueue(next, next.cost);
        });
        visited[cur.curIndex] = {cost: cur.cost, rotation: cur.curRotation};
    }
}

export function findShortestPathBBAA({paths, start, end}, maxCost) {
    const startIndex = paths.findIndex(path => path == start);
    const toCheck = new PriorityQueue();
    toCheck.enqueue({ 
        curIndex: startIndex, 
        curRotation: {x: 1, y: 0}, 
        path: [startIndex], 
        cost: 0,
        visited: new Set([startIndex])
    }, 0);

    const bestpaths = [];
    const bbVis = {};
    bbVis[startIndex] = {cost: 0, rotation: {x: 1, y: 0}};
    let loop = 0;
    while(toCheck.size() > 0) {
        const cur = toCheck.dequeue().node;
        if(loop++ % 10000 == 9999) {
            console.log(cur.cost)
        }
        const curTile = paths[cur.curIndex];
        if (curTile.x == end.x && curTile.y == end.y) {
            bestpaths.push(cur);
            continue;
        }
        const neighbours = findNeighbourPaths(paths, curTile);
        neighbours.forEach(neighbourIndex => {
            if(cur.visited.has(neighbourIndex)) {
                return;
            }
            const next = copy(cur);
            const nextTile = paths[neighbourIndex];
            next.curIndex = neighbourIndex;
            next.path.push(next.curIndex);
            next.visited.add(next.curIndex);
            next.cost += 1;
            next.curRotation = {x: nextTile.x - curTile.x, y: nextTile.y - curTile.y};
            next.cost += 1000 * rotationsFromDirection(cur.curRotation, next.curRotation);
            if(bbVis[neighbourIndex] !== undefined && next.cost > bbVis[neighbourIndex].cost + rotationsFromDirection(next.curRotation, bbVis[neighbourIndex].rotation) * 1000) {
                return;
            }
            if(next.cost > maxCost) {
                return;
            }
            toCheck.enqueue(next, next.cost);
        });
        bbVis[cur.curIndex] = {cost: cur.cost, rotation: cur.curRotation};
    }
    return bestpaths;
}

function copy(cur) {
    return { 
        curIndex: cur.curIndex, 
        visited: new Set(cur.visited), 
        path: [...cur.path], 
        cost: cur.cost,
        curRotation: cur.curRotation,
    }
}

export function printPath(path) {
    const maxX = path.reduce((agg, cur) => cur.x > agg ? cur.x : agg, 0)
    const maxY = path.reduce((agg, cur) => cur.y > agg ? cur.y : agg, 0)
    let str = "";
    for(let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            if(path.find(p => p.x == x && p.y == y)) {
                str += "#"
            } else {
                str += ".";
            }
        }
        str += "\n";
    }
    return str;
}