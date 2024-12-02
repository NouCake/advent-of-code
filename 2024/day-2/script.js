export function parseReport(input) {
    return input.split('\n').map(report => {
        return report.split(' ').map(e => Number.parseInt(e));
    });

}

export function isSafe(report) {
    const modeIncreasing = report[0] < report[1];
    //console.log("Checking report", report, modeIncreasing, report.length)
   
    for(let i = 0; i < report.length - 1; i++) {
        const a = report[i];
        const b = report[i+1];

        //console.log(modeIncreasing ? "Increasing" : "Decreasing", "with", a, b);
        if (!modeIncreasing && a < b) {
            //console.log("! Not safe");
            return false;
        }
        if (modeIncreasing && a > b) {
            //console.log("Not safe");
            return false;
        }

        const diff = Math.abs(a - b);
        if (diff < 1 || diff > 3) {
            //console.log("Not safe, dif is", diff);
            return false;
        }
    }

    //console.log("Safe");
    return true;
}

export function checkBetterInput(input) {
    const reports = parseReport(input);

    const safeReports = reports.filter(report => {
        if (isSafe(report)) {
            return true;
        }
        for(let i = 0; i < report.length; i++) {
            const copy = report.slice(0);
            copy.splice(i, 1);
            if(isSafe(copy)) {
                return true;
            }
        }
        
        return false;
    });
    return safeReports.length;
}

export function checkInput(input) {
    const reports = parseReport(input);

    const safeReports = reports.filter(report => isSafe(report));
    return safeReports.length;
}