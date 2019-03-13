import handleProd from './prod'
import handleDev from './dev'
import handleTemplate from './template'
import handleHelp from './help'

export default {
    dev: {
        action: () => handleDev(),
        explain: 'Build development distribution and start dev server'
    },
    prod: {
        action: () => handleProd(),
        explain: 'Build production distribution'
    },
    template: {
        action: () => handleTemplate(),
        explain: 'Create a default MERN template'
    },
    help: {
        action: () => handleHelp(),
        explain: 'Display all commands'
    }
}
