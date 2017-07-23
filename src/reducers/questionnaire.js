import { deepCopy } from '../scripts/utils'

let nextQuestionId = 0

const questions = (state = [], action) => {
    switch (action.type) {
        case 'ADD_QUESTION': {
            return [
                ...state,
                {
                    id: nextQuestionId++,
                    type: action.payload.type,
                    hasOther: false,
                    options: ['选项 1', '选项 2'],
                },
            ]
        }
        case 'COPY_QUESTION': {
            const curQuestions = state.slice()
            const { index } = action.payload
            let targetQuestion = deepCopy(curQuestions[index])

            targetQuestion = {
                ...targetQuestion,
                id: nextQuestionId++,
            }
            curQuestions.splice((index + 1), 0, targetQuestion)

            return curQuestions
        }
        case 'SET_QUESTION_TYPE': {
            const curQuestions = state.slice()
            const { index, type } = action.payload
            curQuestions[index].type = type
            return curQuestions
        }
        case 'TOGGLE_QUESTION': {
            const curQuestions = state.slice()
            const { index } = action.payload
            curQuestions[index].isRequired = !curQuestions[index].isRequired
            return curQuestions
        }
        case 'REMOVE_QUESTION': {
            const curQuestions = state.slice()
            const { index } = action.payload
            curQuestions.splice(index, 1)
            return curQuestions
        }
        case 'ADD_OPTION': {
            const curQuestions = state.slice()
            const { index } = action.payload
            const options = curQuestions[index].options
            options.push(`选项 ${options.length + 1}`)
            return curQuestions
        }
        case 'OPTION_CHANGE': {
            const curQuestions = state.slice()
            const { questionIndex, optionIndex, event } = action.payload
            const options = curQuestions[questionIndex].options
            options[optionIndex] = event.target.value
            return curQuestions
        }
        case 'REMOVE_OPTION': {
            const curQuestions = state.slice()
            const { questionIndex, optionIndex } = action.payload
            const options = curQuestions[questionIndex].options
            options.splice(optionIndex, 1)
            return curQuestions
        }
        case 'ADD_OTHER': {
            const curQuestions = state.slice()
            const { index } = action.payload
            curQuestions[index].hasOther = true
            return curQuestions
        }
        case 'REMOVE_OTHER': {
            const curQuestions = state.slice()
            const { index } = action.payload
            curQuestions[index].hasOther = false
            return curQuestions
        }
        default: {
            return state
        }
    }
}

export default questions
