const fs = require('fs-extra');
const childProcess = require('child_process');

try {
    // Remove current build
    fs.removeSync('./dist/');
    // Transpile the typescript files
    const proc = childProcess.exec('tsc -p tsconfig.prod.json');
    proc.on('close', (code) => {
        if (code !== 0 && code !== 2) {
            throw Error('Build failed with code ' + code);
        }
    })
} catch (err) {
    console.log(err);
}
