

export function calculateChecksum(input, debug = false) {
    const memory = input.split("").map(e => Number.parseInt(e));

    let checkSum = 0;
    let index = 0;

    let lastIndex = Math.floor((memory.length - 1) / 2) * 2;

    let memoryString = "";
    for(let i = 0; i <= lastIndex; i++) {
        const isFileBlock = i % 2 === 0;
        const blockValue = memory[i];

        if (isFileBlock) {
            const fileIndex = Math.floor(i / 2);

            for(let y = 0; y < blockValue; y++) {
                checkSum += index * fileIndex;
                if (debug) {
                    memoryString += fileIndex;
                }
                index++;
            }

        } else {

            let freeMemory = blockValue;

            while (freeMemory > 0) {
                while(memory[lastIndex] <= 0) {
                    lastIndex -= 2;
                }

                const fileIndex = Math.floor(lastIndex / 2);

                freeMemory -= 1;
                checkSum += index * fileIndex;
                if (debug) {
                    memoryString += fileIndex;
                }
                index++;
                memory[lastIndex] -= 1;
            }

        }
    }
    
    if (debug) {
        console.log(memoryString);
    }
    return checkSum;
}

export function calculateChecksum2(input, debug = false) {
    const memory = input.split("").map(e => Number.parseInt(e));

    let index = 0;
    let checkSum = 0;

    let memoryString = "";
    let movedBlocks = [];
    for(let i = 0; i < memory.length; i++) {
        let m = movedBlocks.find(e => e[0] === i)
        if (m) {
            for(let y = 0; y < m[1]; y++) {
                index++;
                if (debug) {
                    memoryString += ".";
                }
            }
        }
        const isFileBlock = i % 2 === 0;
        const blockValue = memory[i];

        if (isFileBlock) {
            const fileIndex = Math.floor(i / 2);

            for(let y = 0; y < blockValue; y++) {
                checkSum += index * fileIndex;
                if (debug) {
                    memoryString += fileIndex;
                }
                index++;
            }

        } else {
            

            let freeMemory = blockValue;

            while (freeMemory > 0) {
                const nextIndex = findBlockThatFits(memory, freeMemory, i);
                const fileIndex = Math.floor(nextIndex / 2);
                if (!nextIndex) {
                    for(let y = 0; y < freeMemory; y++) {
                        index++;
                        if (debug) {
                            memoryString += ".";
                        }
                    }
                    break;
                }

                const blockValue = memory[nextIndex];
                freeMemory -= blockValue;
                memory[nextIndex] = 0;
                //memory[nextIndex+1] = -blockValue;
                movedBlocks.push([nextIndex, blockValue]);
                


                for (let y = 0; y < blockValue; y++) {
                    checkSum += index * fileIndex;
                    if (debug) {
                        memoryString += fileIndex;
                    }
                    index++;
                }
            }

        }
    }

    if (debug) {
        console.log(memoryString);
    }
    return checkSum;
}

export function findBlockThatFits(memory, maxSize, start) {
    for (let i = memory.length; i >= start; i--) {
        if (i % 2 == 1) continue;
        if (memory[i] <= 0) continue;
        if (memory[i] <= maxSize) {
            return i;
        }
    }
    return false;
}