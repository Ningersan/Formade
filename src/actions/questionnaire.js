import * as Types from '../constants/ActionTypes'
import * as utils from '../scripts/utils'

// 等待抽离
export const addQuestion = (type, id) => ({
    type: Types.ADD_QUESTION,
    payload: {
        type,
        id,
    },
})

// export const addQuestion = type => (dispatch, getState) => {
//     const { questions: { editingIds } } = getState()
//     dispatch(addQuestionAction(type, editingIds.length))
// }

// questionnaire actions
export const stopResponse = id => ({
    type: Types.STOP_RESPONSE,
    payload: {
        id,
    },
})

const addQuestionnaireAction = questionnaireId => ({
    type: Types.ADD_QUESTIONNAIRE,
    payload: {
        questionnaireId,
    },
})

export const addQuestionnaire = () => (dispatch) => {
    dispatch(addQuestionnaireAction(utils.guid()))
    dispatch(addQuestion('radio', utils.guid()))
    dispatch(addQuestion('radio', utils.guid()))
}

const saveQuestionnaireAction = (editing, formId, editingIds, allQuestions) => ({
    type: Types.SAVE_QUESTIONNAIRE,
    payload: {
        editing,
        formId,
        editingIds,
        allQuestions,
    },
})

export const saveQuestionnaire = () => (dispatch, getState) => {
    const {
        editing,
        editing: { questionnaire: formId },
        questions: { byId: allQuestions },
        questions: { editingIds },
    } = getState()

    dispatch(saveQuestionnaireAction(editing, formId, editingIds, allQuestions))
}

export const renameQuestionnaire = (value, id) => ({
    type: Types.RENAME_QUESTIONNAIRE,
    payload: {
        value,
        id,
    },
})

const editQuestionnaireAction = (id, editing) => ({
    type: Types.EDIT_QUESTIONNAIRE,
    payload: {
        id,
        editing,
    },
})

export const editQuestionnaire = id => (dispatch, getState) => {
    const { forms: { byId } } = getState()
    dispatch(editQuestionnaireAction(id, byId[id]))
}

export const fillQuestionnaire = () => ({
    type: Types.FILL_QUESTIONNAIRE,
})

export const submitQuestionnaire = () => ({
    type: Types.SUBMIT_QUESTIONNAIRE,
})

export const removeQuestionnaire = id => ({
    type: Types.REMOVE_QUESTIONNAIRE,
    payload: {
        id,
    },
})

export const saveQuestionnaireTitle = text => ({
    type: Types.SAVE_QUESTIONNAIRE_TITLE,
    payload: {
        text,
    },
})

// question actions
export const saveQuestionTitle = (text, id) => ({
    type: Types.SAVE_QUESTION_TITLE,
    payload: {
        text,
        id,
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

export const saveText = (text, type, index) => ({
    type: Types.SAVE_TEXT,
    payload: {
        text,
        type,
        index,
    },
})

const saveTitleAction = (text, type, questionIndex) => ({
    type: Types.SAVE_TITLE,
    payload: {
        text,
        type,
        questionIndex,
    },
})

export const saveTitle = (text, type, questionId) => (dispatch, getState) => {
    if (type === 'questionnaire') {
        dispatch(saveQuestionnaireTitle(text))
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

export const chooseOption = (questionIndex, optionIndex, type) => ({
    type: Types.CHOOSE_OPTION,
    payload: {
        questionIndex,
        optionIndex,
        type,
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
