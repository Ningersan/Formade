import * as Types from '../constants/QuestionnaireActionTypes'

export const addQuestion = questionType => ({
    type: Types.ADD_QUESTION,
    questionType,
})

export const copyQuestion = index => ({
    type: Types.COPY_QUESTION,
    index,
})

export const setQuestionType = (index, questionType) => ({
    type: Types.SET_QUESTION_TYPE,
    index,
    questionType,
})

export const toggleQuestion = index => ({
    type: Types.TOGGLE_QUESTION,
    index,
})

export const removeQuestion = index => ({
    type: Types.REMOVE_QUESTION,
    index,
})

export const addOption = index => ({
    type: Types.ADD_OPTION,
    index,
})

export const optionChange = (questionIndex, optionIndex, event) => ({
    type: Types.OPTION_CHANGE,
    questionIndex,
    optionIndex,
    event,
})

export const removeOption = (questionIndex, optionIndex) => ({
    type: Types.REMOVE_OPTION,
    questionIndex,
    optionIndex,
})

export const addOther = index => ({
    type: Types.ADD_OTHER,
    index,
})

export const removeOther = index => ({
    type: Types.REMOVE_OTHER,
    index,
})
