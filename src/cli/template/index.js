import util from 'util'
import { exec } from 'child_process'
import { getCurrentDir } from '../../util/common'

const templateLocation = 'https://github.com/anduong96/Mage.git'
const bash = util.promisify(exec)

async function template() {
    const destination = `${getCurrentDir()}/wwyd-project`
    await bash(`git clone ${templateLocation} ${destination}`)
    await bash('cd wwyd-project')
}

export default template
