export function parseMap(input) {
    return input.split("\n").map(line => line.split(""))
}

export function findRegions(map) {
    const regions = [];
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if(map[y][x] == ".") {
                continue;
            }

            const toSearch = [{x, y}];
            const identifier = map[y][x];

            const region = {identifier, coords: [{x, y}]};
            map[y][x] = ".";

            while(toSearch.length > 0) {
                const coords = toSearch.pop();
                const neighbours = getNeighbours(map, coords, identifier);
                neighbours.forEach(neighbour => {
                    if(!region.coords.find(coord => coord.x == neighbour.x && coord.y == neighbour.y)) {
                        toSearch.push(neighbour);
                        region.coords.push(neighbour)
                    }
                });
                map[coords.y][coords.x] = ".";
            }
            regions.push(region);
        }
    }
    return regions;
}

export function getNeighbours(map, {x, y}, identifier) {
    const height = map.length;
    const width = map[0].length;

    const neighbours = [];
    if (x - 1 >= 0 && map[y][x - 1] == identifier) {
        neighbours.push({x: x - 1, y});
    }
    if (x + 1 < width && map[y][x + 1] == identifier) {
        neighbours.push({x: x + 1, y});
    }
    if (y - 1 >= 0 && map[y - 1][x] == identifier) {
        neighbours.push({x, y: y - 1});
    }
    if (y + 1 < height && map[y + 1][x] == identifier) {
        neighbours.push({x, y: y + 1});
    }
    return neighbours;
}

export function findOutline(region) {
    const outline = [];
    const toLook = [
        {x: -1, y: 0},
        {x: 1, y: 0},
        {x: 0, y: -1},
        {x: 0, y: 1}
    ]

    region.coords.forEach(coord => {
        toLook.forEach(offset => {
            const neighbour = region.coords.find(c => c.x == coord.x + offset.x && c.y == coord.y + offset.y);
            if(!neighbour) {
                outline.push({coord: {x: coord.x + offset.x, y: coord.y + offset.y}, side: offset});
            }
        })
    });
    
    return outline;
}

export function findNumSides(outline, identifier) {
    let vertical = 0;
    let horizontal = 0;
    let minX = Number.MAX_VALUE;
    let maxX = 0;
    let minY = Number.MAX_VALUE;
    let maxY = 0;

    outline.forEach(({coord}) => {
        if(coord.x > maxX) {
            maxX = coord.x;
        }
        if(coord.y > maxY) {
            maxY = coord.y;
        }
        if(coord.x < minX) {
            minX = coord.x;
        }
        if(coord.y < minY) {
            minY = coord.y;
        }
    });

    for(let y = minY; y <= maxY; y++) {
        let inRow = outline.filter(o => o.coord.y == y && o.side.x == 0);

        while(inRow.length > 0) {
            const first = inRow.pop();
            const continuous = [first];
            let cur = first;
            while(cur) {
                cur = inRow.find(({coord, side}) => coord.x == cur.coord.x + 1 && side.y == cur.side.y);
                if(cur) continuous.push(cur);
            }
            cur = first;
            while(cur) {
                if(cur) continuous.push(cur);
                cur = inRow.find(({coord, side}) => coord.x == cur.coord.x - 1 && side.y == cur.side.y);
            }
            
            vertical++;
            inRow = inRow.filter(({coord, side}) => !continuous.find(c => c.coord.x == coord.x && c.side.y == side.y));
        }
    }



    for(let x = minX; x <= maxX; x++) {
        let inCol = outline.filter(o => o.coord.x == x && o.side.y == 0);

        while(inCol.length > 0) {
            const first = inCol.pop();
            const continuous = [first];
            let cur = first;
            while(cur) {
                cur = inCol.find(({coord, side}) => coord.y == cur.coord.y + 1 && side.x == cur.side.x);
                if(cur) continuous.push(cur);
            }
            cur = first;
            while(cur) {
                cur = inCol.find(({coord, side}) => coord.y == cur.coord.y - 1  && side.x == cur.side.x);
                if(cur) continuous.push(cur);
            }
            
            horizontal++;
            inCol = inCol.filter(({coord, side}) => !continuous.find(c => c.coord.y == coord.y && c.side.x == side.x));
        }
    }
    return vertical + horizontal;
}