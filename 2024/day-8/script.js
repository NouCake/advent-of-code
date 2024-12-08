export function parseMap(input) {
    const width = input.split("\n")[0].length;
    const map = {};
    input.split("\n").join("").split("").forEach((char, index) => {
        const x = index % width;
        const y = Math.floor(index / width);

        if (char != ".") {
            map[char] = (map[char] || []);
            map[char].push({ x, y });
        }
    })

    return map;
}

export function findAntiNodes(antenas) {
    const antiNodes = [];
    for (let a = 0; a < antenas.length-1; a++) {
        for (let b = a+1; b < antenas.length; b++) {
            const a1 = antenas[a];
            const a2 = antenas[b];

            const dist = {x: a2.x - a1.x, y: a2.y - a1.y};
            antiNodes.push({
                x: a2.x + dist.x,
                y: a2.y + dist.y
            })
            antiNodes.push({
                x: a1.x - dist.x,
                y: a1.y - dist.y
            })
        }
    }
    return antiNodes;
}



export function findAllAntiNodes(antenas, mapSize) {
    const antiNodes = [];
    for (let a = 0; a < antenas.length-1; a++) {
        for (let b = a+1; b < antenas.length; b++) {
            const a1 = antenas[a];
            const a2 = antenas[b];

            const dist = {x: a2.x - a1.x, y: a2.y - a1.y};
            let nodeFound = false;
            let i = 1;
            do {
                nodeFound = false;
                let node = {
                    x: a2.x + dist.x * i,
                    y: a2.y + dist.y * i,
                };
                if (node.x >= 0 && node.x < mapSize && node.y >= 0 && node.y < mapSize) {
                    antiNodes.push(node);
                    nodeFound = true;
                }
                node = {
                    x: a1.x - dist.x * i,
                    y: a1.y - dist.y * i,
                }
                if (node.x >= 0 && node.x < mapSize && node.y >= 0 && node.y < mapSize) {
                    antiNodes.push(node);
                    nodeFound = true;
                }
                i++;
            } while(nodeFound);
        }
    }
    return antiNodes;
}

export function filterOutsideMap(nodes, map) {
    const width = map.split("\n")[0].length;
    const height = map.split("\n").length;
    return nodes.filter(node => node.x >= 0 && node.x < width && node.y >= 0 && node.y < height);
}

export function filterDuplicateNodes(nodes) {
    return nodes.filter((node, index) => nodes.findIndex(n => n.x == node.x && n.y == node.y) == index);
}