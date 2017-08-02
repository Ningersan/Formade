import * as Types from '../constants/QuestionnaireActionTypes'

export const addQuestionnaire = () => ({
    type: Types.ADD_QUESTIONNAIRE,
})

export const saveQuestionnaire = () => ({
    type: Types.SAVE_QUESTIONNAIRE,
})

export const editQuestionnaire = index => ({
    type: Types.EDIT_QUESTIONNAIRE,
    payload: {
        index,
    },
})

export const submitQuestionnaire = () => ({
    type: Types.SUBMIT_QUESTIONNAIRE,
})

export const removeQuestionnaire = index => ({
    type: Types.REMOVE_QUESTIONNAIRE,
    payload: {
        index,
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

export const saveTitle = (text, type, questionIndex) => ({
    type: Types.SAVE_TITLE,
    payload: {
        text,
        type,
        questionIndex,
    },
})

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

export const editOption = (questionIndex, optionIndex, event) => ({
    type: Types.EDIT_OPTION,
    payload: {
        questionIndex,
        optionIndex,
        event,
    },
})

export const chooseOption = (questionIndex, optionIndex, type) => ({
    type: Types.CHOOSE_OPTION,
    payload: {
        questionIndex,
        optionIndex,
        type,
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
    },
})
