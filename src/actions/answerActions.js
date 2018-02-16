import * as Types from '../constants/ActionTypes'
import * as utils from '../scripts/utils'

export const chooseOption = (questionIndex, optionIndex, type) => ({
    type: Types.CHOOSE_OPTION,
    payload: {
        questionIndex,
        optionIndex,
        type,
    },
})
