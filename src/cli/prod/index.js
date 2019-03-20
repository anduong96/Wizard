import gulp from 'gulp'
import named from 'vinyl-named'
import webpackStream from 'webpack-stream'
import chalk from 'chalk'
import { isValidProject, getCurrentDir, getPackageJson } from '../../util/common'
import getDevConfig from '../../webpack/prod.config'

function production() {
    if (!isValidProject()) {
        console.log(chalk.redBright.bold('Invalid project.'))
        return
    }

    const dir = getCurrentDir()
    const packageJson = getPackageJson(dir)
    const wwyd = packageJson.wwyd || {}
    const output = `${dir}/production/dist`
    const config = getDevConfig({ location: output })

    gulp.src(`${dir}/${wwyd.client || 'client/app/index.js'}`)
        .pipe(named())
        .pipe(webpackStream({ config }))
        .pipe(minify())
        .pipe(gzip())
        .pipe(gulp.dest(output))
}

export default production
