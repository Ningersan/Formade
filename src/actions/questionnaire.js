import * as Types from '../constants/QuestionnaireActionTypes'

export const addQuestion = type => ({
    type: Types.ADD_QUESTION,
    payload: {
        type,
    },
})

export const copyQuestion = index => ({
    type: Types.COPY_QUESTION,
    payload: {
        index,
    },
})

export const setQuestionType = (index, type) => ({
    type: Types.SET_QUESTION_TYPE,
    payload: {
        index,
        type,
    },
})

export const toggleQuestion = index => ({
    type: Types.TOGGLE_QUESTION,
    payload: {
        index,
    },
})

export const removeQuestion = index => ({
    type: Types.REMOVE_QUESTION,
    payload: {
        index,
    },
})

export const addOption = index => ({
    type: Types.ADD_OPTION,
    payload: {
        index,
    },
})

export const optionChange = (questionIndex, optionIndex, event) => ({
    type: Types.OPTION_CHANGE,
    payload: {
        questionIndex,
        optionIndex,
        event,
    },
})

export const removeOption = (questionIndex, optionIndex) => ({
    type: Types.REMOVE_OPTION,
    payload: {
        questionIndex,
        optionIndex,
    },
})

export const addOther = index => ({
    type: Types.ADD_OTHER,
    payload: {
        index,
    },
})

export const removeOther = index => ({
    type: Types.REMOVE_OTHER,
    payload: {
        index,
    }
})