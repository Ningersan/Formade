import { deepCopy } from '../scripts/utils'

const list = []
let nextQuestionId = 0

const initEditing = {
    questionnaireId: -1,
    title: '未命名的表单',
    description: '',
    status: '未发布',
    deadline: '2017年7月26日',
    questions: [{
        title: '未命名的问题',
        id: nextQuestionId++,
        type: 'radio',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    },
    {
        title: '未命名的问题',
        id: nextQuestionId++,
        type: 'checkbox',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    }],

    // record fill data
    data: [],
}

const initState = {
    list,
    editing: deepCopy(initEditing),
}

const questionnaires = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUESTIONNAIRE': {
            return { ...state, editing: { ...initEditing, questionnaireId: list.length } }
        }
        case 'SAVE_QUESTIONNAIRE': {
            const { list, editing } = state
            list[editing.questionnaireId] = { ...editing }
            return { ...state, list }
        }
        case 'EDIT_QUESTIONNAIRE': {
            const { list, editing } = state
            const { index } = action.payload
            return { ...state, editing: { ...list[index] } }
        }
        case 'SUBMIT_QUESTIONNAIRE': {
            const editing = deepCopy(state.editing)
            const { list } = state
            const { questionnaireId, data } = editing
            list[questionnaireId].data.push(data)
            editing.data = []
            return { ...state, list, editing }
        }
        case 'REMOVE_QUESTIONNAIRE': {
            const list = deepCopy(state.list)
            const { index } = action.payload
            list.splice(index, 1)
            return { ...state, list }
        }
        case 'SAVE_TEXT': {
            const editing = deepCopy(state.editing)
            const { text, type, index } = action.payload
            console.log(type)
            type === 'answer' ? editing.data[index] = text : editing.description = text
            return { ...state, editing }
        }
        case 'SAVE_TITLE': {
            const editing = deepCopy(state.editing)
            const { text, type, questionIndex } = action.payload
            type === 'questionnaire' ? editing.title = text : editing.questions[questionIndex].title = text
            return { ...state, editing }
        }
        case 'ADD_QUESTION': {
            const editing = deepCopy(state.editing)
            const { type } = action.payload
            editing.questions.push({
                id: nextQuestionId++,
                title: '未命名的问题',
                type,
                isRequired: false,
                hasOther: false,
                options: ['选项 1', '选项 2'],
            })
            return { ...state, editing }
        }
        case 'COPY_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const questions = editing.questions
            const targetQuestion = deepCopy(questions[index])
            targetQuestion.id++
            questions.splice((index + 1), 0, targetQuestion)
            return { ...state, editing }
        }
        case 'SET_QUESTION_TYPE': {
            const editing = deepCopy(state.editing)
            const { index, type } = action.payload
            editing.questions[index].type = type
            return { ...state, editing }
        }
        case 'TOGGLE_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const targetQuestion = editing.questions[index]
            targetQuestion.isRequired = !targetQuestion.isRequired
            return { ...state, editing }
        }
        case 'REMOVE_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions.splice(index, 1)
            return { ...state, editing }
        }
        case 'ADD_OPTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const options = editing.questions[index].options
            options.push(`选项 ${options.length + 1}`)
            return { ...state, editing }
        }
        case 'EDIT_OPTION': {
            const editing = deepCopy(state.editing)
            const { questionIndex, optionIndex, event } = action.payload
            const options = editing.questions[questionIndex].options
            options[optionIndex] = event.target.value
            return { ...state, editing }
        }
        case 'CHOOSE_OPTION': {
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
        case 'REMOVE_OPTION': {
            const editing = deepCopy(state.editing)
            const { questionIndex, optionIndex } = action.payload
            const options = editing.questions[questionIndex].options
            options.splice(optionIndex, 1)
            return { ...state, editing }
        }
        case 'ADD_OTHER': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions[index].hasOther = true
            return { ...state, editing }
        }
        case 'REMOVE_OTHER': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions[index].hasOther = false
            return { ...state, editing }
        }
        default: {
            return state
        }
    }
}

export default questionnaires
