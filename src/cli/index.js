import commands from './commands'

export default ({ _ = [] }) => {
    const arg = _[0]
    if (commands.hasOwnProperty(arg)) {
        return commands[arg].action()
    }

    return console.log('Invalid command. Use help instead')
}
