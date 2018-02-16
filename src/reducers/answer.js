import * as actionTypes from '../constants/ActionTypes'

const answers = (state, action) => {
    switch (action) {
        case actionTypes.SUBMIT_FORM:
            const { list, editing } = state
            const { index } = action.payload
            return { ...state, editing: { ...list[index] } }
        default:
            return state
    }
}

export default answers
