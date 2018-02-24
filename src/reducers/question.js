import { combineReducers } from 'redux'
import * as utils from '../../src/scripts/utils'
import * as actionTypes from '../constants/ActionTypes'

// question reducer
const initialState = {
    // 0: {
    //     id: 0,
    //     form: -1,
    //     type: 'radio',
    //     title: '未命名的问题',
    //     isRequired: false,
    //     hasOther: false,
    //     options: ['选项 1', '选项 2'],
    // },
    // 1: {
    //     id: 1,
    //     form: -1,
    //     type: 'radio',
    //     title: '未命名的问题',
    //     isRequired: false,
    //     hasOther: false,
    //     options: ['选项 1', '选项 2'],
    // },
}

// const initialEditingIds = [0, 1]

const addQuestion = (state, action) => {
    const { id, type } = action.payload

    // defalut question
    const question = {
        id,
        form: -1,
        type,
        title: '未命名的问题',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    }

    return {
        ...state,
        [id]: question,
    }
}

const saveQuestionTitle = (state, action) => {
    const { id, title } = action.payload
    const question = state[id]
    return {
        ...state,
        [id]: {
            ...question,
            title,
        },
    }
}

const copyQuestion = (state, action) => {
    const { id, newId } = action.payload
    return {
        ...state,
        [newId]: {
            ...state[id],
            id: newId,
        },
    }
}

const setQuestionType = (state, action) => {
    const { id, type } = action.payload
    const question = state[id]
    return {
        ...state,
        [id]: {
            ...question,
            type,
        },
    }
}

const toggleQuestion = (state, action) => {
    const { id } = action.payload
    const question = state[id]
    return {
        ...state,
        [id]: {
            ...question,
            isRequired: !question.isRequired,
        },
    }
}

const removeQuestion = (state, action) => {
    const { id } = action.payload

    // console.log((({ [id]: deleted, ...newState }) => newState)(state))
    // return (({ [id]: deleted, ...newState }) => newState)(state)

    const newState = Object.assign({}, state)
    delete newState[id]
    return newState
}

const addOption = (state, action) => {
    const { questionId } = action.payload
    const question = state[questionId]
    const options = question.options
    return {
        ...state,
        [questionId]: {
            ...question,
            options: options.concat(`选项 ${options.length + 1}`),
        },
    }
}

const editOption = (state, action) => {
    const { questionId, optionId, event } = action.payload
    const question = state[questionId]

    // new options
    const options = question.options.map((option, index) => {
        if (index !== optionId) {
            return option
        }
        return event.target.value
    })

    return {
        ...state,
        [questionId]: {
            ...question,
            options,
        },
    }
}

const chooseOption = (state, action) => {
    const editing = deepCopy(state.editing)
    const { data } = editing
    const { questionIndex, optionIndex, type } = action.payload
    if (type === 'radio') {
        data[questionIndex] = optionIndex
    }
    if (type === 'checkbox') {
        let index = null
        if (!data[questionIndex]) {
            data[questionIndex] = [optionIndex]
            return { ...state, editing }
        }
        index = data[questionIndex].indexOf(optionIndex)
        index !== -1 ? data[questionIndex].splice(index, 1) : data[questionIndex].push(optionIndex)
    }
    return { ...state, editing }
}

const removeOption = (state, action) => {
    const { questionId, optionId } = action.payload
    const question = state[questionId]
    const options = question.options.filter((option, index) => index !== optionId)

    return {
        ...state,
        [questionId]: {
            ...question,
            options,
        },
    }
}

const addOther = (state, action) => {
    const { questionId } = action.payload
    const question = state[questionId]

    return {
        ...state,
        [questionId]: {
            ...question,
            hasOther: true,
        },
    }
}

const removeOther = (state, action) => {
    const { questionId } = action.payload
    const question = state[questionId]

    return {
        ...state,
        [questionId]: {
            ...question,
            hasOther: false,
        },
    }
}

// reducer
const questionsById = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return addQuestion(state, action)
        case actionTypes.SAVE_QUESTION_TITLE:
            return saveQuestionTitle(state, action)
        case actionTypes.COPY_QUESTION:
            return copyQuestion(state, action)
        case actionTypes.SET_QUESTION_TYPE:
            return setQuestionType(state, action)
        case actionTypes.TOGGLE_QUESTION:
            return toggleQuestion(state, action)
        case actionTypes.REMOVE_QUESTION:
            return removeQuestion(state, action)
        case actionTypes.ADD_OPTION:
            return addOption(state, action)
        case actionTypes.EDIT_OPTION:
            return editOption(state, action)
        case actionTypes.CHOOSE_OPTION:
            return chooseOption(state, action)
        case actionTypes.REMOVE_OPTION:
            return removeOption(state, action)
        case actionTypes.ADD_OTHER:
            return addOther(state, action)
        case actionTypes.REMOVE_OTHER:
            return removeOther(state, action)
        default:
            return state
    }
}


// all ids reducer
const initialAllIds = {
    // 0: [1, 2]
}

const allQuestions = (state = initialAllIds, action) => {
    switch (action.type) {
        // case actionTypes.SAVE_FORM:
        //     return saveQuestionIds(state, action)
        default:
            return state
    }
}

export default combineReducers({
    byId: questionsById,
    allIds: allQuestions,
})
