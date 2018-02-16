import { saveFormTitle } from './formActions'
import * as Types from '../constants/ActionTypes'
import * as utils from '../scripts/utils'

export const addQuestion = (id, type) => ({
    type: Types.ADD_QUESTION,
    payload: {
        id,
        type,
    },
})

export const copyQuestion = index => ({
    type: Types.COPY_QUESTION,
    payload: {
        index,
    },
})

export const sortQuestion = (from, to) => ({
    type: Types.SORT_QUESTION,
    payload: {
        from,
        to,
    },
})

export const setQuestionType = (id, type) => ({
    type: Types.SET_QUESTION_TYPE,
    payload: {
        id,
        type,
    },
})

export const toggleQuestion = id => ({
    type: Types.TOGGLE_QUESTION,
    payload: {
        id,
    },
})

export const removeQuestion = id => ({
    type: Types.REMOVE_QUESTION,
    payload: {
        id,
    },
})

export const saveQuestionTitle = (text, id) => ({
    type: Types.SAVE_QUESTION_TITLE,
    payload: {
        text,
        id,
    },
})

export const saveText = (text, type, index) => ({
    type: Types.SAVE_TEXT,
    payload: {
        text,
        type,
        index,
    },
})

// const saveTitleAction = (text, type, questionIndex) => ({
//     type: Types.SAVE_TITLE,
//     payload: {
//         text,
//         type,
//         questionIndex,
//     },
// })

export const saveTitle = (text, type, questionId) => (dispatch) => {
    if (type === 'form') {
        dispatch(saveFormTitle(text))
    } else {
        dispatch(saveQuestionTitle(text, questionId))
    }
}

export const addOption = questionId => ({
    type: Types.ADD_OPTION,
    payload: {
        questionId,
    },
})

export const editOption = (questionId, optionId, event) => ({
    type: Types.EDIT_OPTION,
    payload: {
        questionId,
        optionId,
        event,
    },
})

export const removeOption = (questionId, optionId) => ({
    type: Types.REMOVE_OPTION,
    payload: {
        questionId,
        optionId,
    },
})

export const addOther = questionId => ({
    type: Types.ADD_OTHER,
    payload: {
        questionId,
    },
})

export const removeOther = questionId => ({
    type: Types.REMOVE_OTHER,
    payload: {
        questionId,
    },
})
