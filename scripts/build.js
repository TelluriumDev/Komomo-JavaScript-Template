const fs = require('fs')
const process = require("child_process")



let manifest = JSON.parse(fs.readFileSync("./manifest.json", "utf8"))

let package = JSON.parse(fs.readFileSync("./package.json", "utf8"))

manifest.description = package.description
manifest.version = package.version
manifest.name = package.name



process.exec(`tsc --outDir "./bin/${manifest.name}"`, (error, stdout, stderr) => {
    if (!error) {
        fs.writeFileSync(`./bin/${manifest.name}/manifest.json`, JSON.stringify(manifest, null, 2), "utf8")
        fs.writeFileSync(`./bin/${manifest.name}/package.json`, JSON.stringify(package, null, 2), "utf8")
        console.log('Build successful')
    } else {
        console.error('Build failed', error)
    }
})

