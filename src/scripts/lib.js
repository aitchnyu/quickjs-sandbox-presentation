// This provides main thing

function lineNumber() {
    const stacktrace = new Error().stack
    const match = stacktrace.match(/\(ours\.js:(\d+)\)/)
    if (match) {
        return parseInt(stacktrace.match(/\(ours\.js:(\d+)\)/)[1])
    } else {
        /*
        sole line would return like 
        at lineNumber (lib.js:12)
        at log (lib.js:26)
        at <eval> (ours.js)
        */
        return 1
    }
}

function fetchJson(path) {
    return JSON.parse(hostFetchJson(path))
}

function log(...values) {
    hostLog(lineNumber(), values)
}