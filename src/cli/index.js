import commands from './commands'
import handleProd from './prod'
import handleDev from './dev'
import handleTemplate from './template'
import handleTest from './test'
import handleHelp from './help'

export default ({ _ = [] }) => {
    const arg = _[0]
    switch(arg) {
        case commands.PRODUCTION: return handleProd()
        case commands.DEVELOPMENT: return handleDev()
        case commands.TEST: return handleTest()
        case commands.TEMPLATE: return handleTemplate()
        case commands.HELP: return handleHelp()
        default: return console.log('Use help instead')
    }
}
