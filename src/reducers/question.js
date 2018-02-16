import { combineReducers } from 'redux'
import { generatorUid } from '../../src/scripts/utils'
import * as actionTypes from '../constants/ActionTypes'

// initial state
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

const initialAllIds = {
    // 0: [1, 2]
}

// reducer
const initQuestion = (state, action) => {
    const { id } = action.payload
    const initial = {
        [id]: {
            id,
            form: -1,
            type: 'radio',
            title: '未命名的问题',
            isRequired: false,
            hasOther: false,
            options: ['选项 1', '选项 2'],
        },
        [id + 1]: {
            id: id + 1,
            form: -1,
            type: 'radio',
            title: '未命名的问题',
            isRequired: false,
            hasOther: false,
            options: ['选项 1', '选项 2'],
        },
    }

    return {
        ...state,
        ...initial,
    }
}

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

const saveQuestion = (state, action) => {
    const { formId, editingIds } = action.payload
    const questions = editingIds.reduce((previous, current) => {
        previous[current] = { ...state[current], form: formId }
        return previous
    }, {})

    return {
        ...state,
        ...questions,
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

const saveQuestionTitle = (state, action) => {
    const { text, id } = action.payload
    const question = state[id]
    return {
        ...state,
        [id]: {
            ...question,
            title: text,
        },
    }
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
        // case actionTypes.ADD_QUESTIONNAIRE:
        //     return initQuestion(state, action)
        case actionTypes.ADD_QUESTION:
            return addQuestion(state, action)
        // case actionTypes.SAVE_QUESTIONNAIRE:
            // return saveQuestion(state, action)
        case actionTypes.COPY_QUESTION:
            return copyQuestion(state, action)
        case actionTypes.SORT_QUESTION:
            return sortQuestion(state, action)
        case actionTypes.SET_QUESTION_TYPE:
            return setQuestionType(state, action)
        case actionTypes.TOGGLE_QUESTION:
            return toggleQuestion(state, action)
        case actionTypes.REMOVE_QUESTION:
            return removeQuestion(state, action)
        case actionTypes.SAVE_QUESTION_TITLE:
            return saveQuestionTitle(state, action)
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

// all editing questions id
// const initEditingIds = (state, action) => {
//     const { questionnaireId } = action.payload
//     console.log(questionnaireId)
//     return [questionnaireId, questionnaireId + 1]
// }

// const addQuestionId = (state, action) => {
//     const { id } = action.payload
//     return state.concat(id)
// }

// const removeQuestionId = (state, action) => {
//     const { id } = action.payload
//     return state.filter(questionId => questionId !== id)
// }

// const EditingQuestions = (state = initialEditingIds, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_QUESTION:
//             return addQuestionId(state, action)
//         case actionTypes.ADD_QUESTIONNAIRE:
//             return initEditingIds(state, action)
//         case actionTypes.REMOVE_QUESTION:
//             return removeQuestionId(state, action)
//         default:
//             return state
//     }
// }

// all question ids
const saveQuestionIds = (state, action) => {
    const { formId, editingIds } = action.payload
    // console.log(formId, allQuestions)
    // const questionIds = Object.keys(state).filter(id => allQuestions[id].form === formId)

    return {
        ...state,
        [formId]: editingIds.slice(),
    }
}

const allQuestions = (state = initialAllIds, action) => {
    switch (action.type) {
        // case actionTypes.SAVE_QUESTIONNAIRE:
        //     return saveQuestionIds(state, action)
        default:
            return state
    }
}

export default combineReducers({
    byId: questionsById,
    // editingIds: EditingQuestions,
    allIds: allQuestions,
})
