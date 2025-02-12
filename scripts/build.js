const fs = require('fs')
const path = require('path')
const package = require('../package.json');
let manifest = require('../manifest.json');

manifest.description = package.description
manifest.version = package.version
manifest.name = package.name

const sourceDirectories = ['src'] // 只包含 src 目录
const targetDirectory = `./bin/${package.name}`
const excludedDirectories = ['node_modules', 'bin', 'scripts'] // 排除这些目录

function copyFile(source, target) {
    const targetDir = path.dirname(target)
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
    }
    fs.copyFileSync(source, target)
}

function moveJsFiles(sourceDir) {
    const files = fs.readdirSync(sourceDir)

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file)
        const relativePath = path.relative(process.cwd(), sourcePath)
        const targetPath = path.join(targetDirectory, relativePath)

        if (fs.statSync(sourcePath).isDirectory()) {
            if (!excludedDirectories.includes(file)) {
                moveJsFiles(sourcePath)
            }
        } else if (path.extname(file) === '.js') {
            copyFile(sourcePath, targetPath)
            console.log(`Moved: ${sourcePath} -> ${targetPath}`)
        }
    })
}

// 移动根目录下的 JS 文件
fs.readdirSync('.').forEach(file => {
    if (path.extname(file) === '.js') {
        const sourcePath = path.join('.', file)
        const targetPath = path.join(targetDirectory, file)
        copyFile(sourcePath, targetPath)
        console.log(`Moved: ${sourcePath} -> ${targetPath}`)
    }
})

// 确保目标目录存在
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true })
}

// 遍历源目录并移动 JS 文件
sourceDirectories.forEach(dir => moveJsFiles(dir))

fs.writeFileSync(`./bin/${manifest.name}/manifest.json`, JSON.stringify(manifest, null, 2), "utf8")
fs.writeFileSync(`./bin/${manifest.name}/package.json`, JSON.stringify(package, null, 2), "utf8")

console.log('Build successfully.')