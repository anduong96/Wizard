import fs from 'fs'

/**
 * @description get directory path where the command was ran
 * @return {string}
 */
export function getCurrentDir() {
    return process.cwd()
}

/**
 * @description get content of file if exist
 * @param {string} path of file
 * @return {string} file content
 */
export function getFileContent(path) {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path,'utf8')
    }

    return null
}

/**
 * Get app's package.json
 * @param {string} dir
 * @return {object}
 */
export function getPackageJson(dir) {
    return JSON.parse(getFileContent(`${dir}/package.json`))
}

/**
 * @description validate project structure
 * @see ARCHITECTURE.md
 * @return {boolean} if it is a valid project
 */
export function isValidProject() {
    const packageJson = getPackageJson(getCurrentDir())
    if (!packageJson) {
        console.log('package.json does not exist!')
        return false
    }

    const hasKraken = true

    //TODO: more checks
    return hasKraken
}
