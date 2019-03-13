import chalk from 'chalk'
import cTable from 'console.table'
import commands from '../commands'

function help() {
    console.log(chalk.blueBright.bold('Command Usage:\n'))
    console.table(Object.entries(commands).map(keypair => {
        const [command, value] = keypair
        return { Command: command, Action: value.explain }
    }))

    console.log(chalk.blue.bold('\n\nExample:\n'))
    console.log('wizard dev')
    console.log('\n\n')
}

export default help
