import { deepCopy } from '../scripts/utils'

const list = []
let nextQuestionId = 0

const initEditing = {
    questionnaireId: -1,
    title: '未命名的表单',
    status: '未发布',
    deadline: '2017年7月26日',
    questions: [{
        title: '未命名的问题',
        id: nextQuestionId++,
        type: 'radio',
        isRequired: false,
        hasOther: false,
        options: ['选项 1', '选项 2'],
    }],
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
        case 'REMOVE_QUESTIONNAIRE': {
            const list = deepCopy(state.list)
            const { index } = action.payload
            list.splice(index, 1)
            return { ...state, list }
        }
        case 'SAVE_TEXT': {
            const editing = deepCopy(state.editing)
            const { text } = action.payload
            editing.title = text
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
        case 'OPTION_CHANGE': {
            const editing = deepCopy(state.editing)
            const { questionIndex, optionIndex, event } = action.payload
            const options = editing.questions[questionIndex].options
            options[optionIndex] = event.target.value
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
