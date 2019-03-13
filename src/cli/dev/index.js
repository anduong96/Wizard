import { isValidProject } from '../../util/common'

function development() {
    if (isValidProject()) {
        console.log('is valid')
    }
}

export default development
