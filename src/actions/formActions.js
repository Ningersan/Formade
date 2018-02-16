import { addQuestion } from './questionActions'
import * as Types from '../constants/ActionTypes'
import * as utils from '../scripts/utils'

export const stopResponse = id => ({
    type: Types.STOP_RESPONSE,
    payload: {
        id,
    },
})

const addFormsAction = formsId => ({
    type: Types.ADD_FORMS,
    payload: {
        formsId,
    },
})

export const addForms = () => (dispatch) => {
    dispatch(addFormsAction(utils.guid()))

    // init default questions
    dispatch(addQuestion('radio', utils.guid()))
    dispatch(addQuestion('radio', utils.guid()))
}

const saveFormsAction = (editing, formId, editingIds, allQuestions) => ({
    type: Types.SAVE_FORMS,
    payload: {
        editing,
        formId,
        editingIds,
        allQuestions,
    },
})

export const saveForms = () => (dispatch, getState) => {
    const {
        editing,
        editing: { forms: formId },
        questions: { byId: allQuestions },
        questions: { editingIds },
    } = getState()

    dispatch(saveFormsAction(editing, formId, editingIds, allQuestions))
}

export const renameForms = (value, id) => ({
    type: Types.RENAME_FORMS,
    payload: {
        value,
        id,
    },
})

const editFormsAction = (id, editing) => ({
    type: Types.EDIT_FORMS,
    payload: {
        id,
        editing,
    },
})

export const editForms = id => (dispatch, getState) => {
    const { forms: { byId } } = getState()
    dispatch(editFormsAction(id, byId[id]))
}

export const fillForms = () => ({
    type: Types.FILL_FORMS,
})

export const submitForms = () => ({
    type: Types.SUBMIT_FORMS,
})

export const removeForms = id => ({
    type: Types.REMOVE_FORMS,
    payload: {
        id,
    },
})

export const saveFormsTitle = text => ({
    type: Types.SAVE_FORMS_TITLE,
    payload: {
        text,
    },
})
