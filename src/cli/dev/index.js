import gulp from 'gulp'
import named from 'vinyl-named'
import webpackStream from 'webpack-stream'
import sourcemaps from 'gulp-sourcemaps'
import nodemon from 'gulp-nodemon'
import chalk from 'chalk'
import { isValidProject, getCurrentDir, getPackageJson } from '../../util/common'
import getDevConfig from '../../webpack/dev.config'

function development() {
    if (!isValidProject()) {
        console.log(chalk.redBright.bold('Invalid project.'))
        return
    }

    const dir = getCurrentDir()
    const packageJson = getPackageJson(dir)
    const wwyd = packageJson.wwyd || {}
    const watch = wwyd.watch || []
    const ignore = wwyd.ignore || []
    const entry = wwyd.entry || `${dir}/index.js`
    const output = `${dir}/development/dist`
    const config = getDevConfig({ output, entry })

    gulp.src(`${dir}/${wwyd.client || 'client/app/index.js'}`)
        .pipe(named())
        .pipe(webpackStream({ config }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))

    nodemon({
        script: `${dir}/index.js`,
        ext: 'js',
        watch: watch.map(f => `${dir}/${f}`),
        ignore: ignore.map(f => `${dir}/${f}`),
        verbose: true,
        legacyWatch: true,
        restartable: 'rs'
    })
}

export default development
