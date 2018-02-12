import { combineReducers } from 'redux'
import { generatorUid } from '../../src/scripts/utils'
import * as actionTypes from '../constants/QuestionnaireActionTypes'

let nextQuestionId = 0
const initialState = {
    0: {
        id: 0,
        form: -1,
        type: 'radio',
        title: '未命名的问题',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    },
    1: {
        id: 1,
        form: -1,
        type: 'radio',
        title: '未命名的问题',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    },
}

const addQuestion = (state, action) => {
    const { type, list } = action.payload

    // defalut question
    const question = {
        id: nextQuestionId++,
        title: '未命名的问题',
        type,
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    }

    return {
        ...state,
        [list.length]: question,
    }
}

// problem cause
const copyQuestion = (state, action) => {
    const { index } = action.payload
    const id = generatorUid()
    return {
        ...state,
        [id]: { ...state[index] },
    }
}

// same to up
const sortQuestion = (state, action) => {
    const editing = deepCopy(state.editing)
    const { from, to } = action.payload
    const { questions } = editing
    const target = questions.splice(from, 1)[0]
    questions.splice(to, 0, target)
    return { ...state, editing }
}

const setQuestionType = (state, action) => {
    const { index, type } = action.payload
    const question = state[index]
    return {
        ...state,
        [index]: {
            ...question,
            type,
        },
    }
}

const toggleQuestion = (state, action) => {
    const { index } = action.payload
    const question = state[index]
    return {
        ...state,
        [index]: {
            ...question,
            isRequired: !question.isRequired,
        },
    }
}

const removeQuestion = (state, action) => {
    const { index } = action.payload
    return (({ [index]: deleted, ...newState }) => newState)(state)
}

const addOption = (state, action) => {
    const { index } = action.payload
    const question = state[index]
    const options = question.options
    return {
        ...state,
        [index]: {
            ...question,
            options: options.concat(`选项 ${options.length + 1}`),
        },
    }
}

const editOption = (state, action) => {
    const { questionIndex, optionIndex, event } = action.payload
    const question = state[questionIndex]

    // new options
    const options = question.options.map((option, index) => {
        if (option.id !== optionIndex) {
            return option
        }
        return event.target.value
    })

    return {
        ...state,
        [questionIndex]: {
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
    const { questionIndex, optionIndex } = action.payload
    const question = state[questionIndex]
    const options = question.options.filter((option, index) => index !== optionIndex)

    return {
        ...state,
        [questionIndex]: {
            ...question,
            options,
        },
    }
}

const addOther = (state, action) => {
    const { index } = action.payload
    const question = state[index]

    return {
        ...state,
        [index]: {
            ...question,
            hasOther: true,
        },
    }
}

const removeOther = (state, action) => {
    const { index } = action.payload
    const question = state[index]

    return {
        ...state,
        [index]: {
            ...question,
            hasOther: false,
        },
    }
}

// reducer
const questionById = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return addQuestion(state, action)
        case actionTypes.COPY_QUESTION: {
            return copyQuestion(state, action)
        }
        case actionTypes.SORT_QUESTION: {
            return sortQuestion(state, action)
        }
        case actionTypes.SET_QUESTION_TYPE: {
            return setQuestionType(state, action)
        }
        case actionTypes.TOGGLE_QUESTION: {
            return toggleQuestion(state, action)
        }
        case actionTypes.REMOVE_QUESTION: {
            return removeQuestion(state, action)
        }
        case actionTypes.ADD_OPTION: {
            return addOption(state, action)
        }
        case actionTypes.EDIT_OPTION: {
            return editOption(state, action)
        }
        case actionTypes.CHOOSE_OPTION: {
            return chooseOption(state, action)
        }
        case actionTypes.REMOVE_OPTION: {
            return removeOption(state, action)
        }
        case actionTypes.ADD_OTHER: {
            return addOther(state, action)
        }
        case actionTypes.REMOVE_OTHER: {
            return removeOther(state, action)
        }
        default:
            return state
    }
}

const allQuestion = (state = [0, 1], action) => {
    switch (actionTypes.type) {
        default:
            return state
    }
}

export default combineReducers({
    byId: questionById,
    allIds: allQuestion,
})
