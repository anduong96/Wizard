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
    return fs.readFileSync(path,'utf8')
}
/**
 * @description validate project structure
 * @see ARCHITECTURE.md
 * @return {boolean} if it is a valid project
 */
export function isValidProject() {
    const dir = getCurrentDir()
    const packageJson = JSON.parse(getFileContent(`${dir}/package.json`))
    const hasKraken = packageJson.dependencies.hasOwnProperty('kraken-js')

    //TODO: more checks
    return hasKraken
}
