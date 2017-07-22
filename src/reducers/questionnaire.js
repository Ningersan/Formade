import { deepCopy } from '../scripts/utils'

let nextQuestionId = 0

const questions = (state = [], action) => {
    switch (action.type) {
        case 'ADD_QUESTION': {
            return [
                ...state,
                {
                    id: nextQuestionId++,
                    type: action.questionType,
                    hasOther: false,
                    options: ['选项 1', '选项 2'],
                },
            ]
        }
        case 'COPY_QUESTION': {
            const curQuestions = state.slice()
            let targetQuestion = deepCopy(curQuestions[action.index])

            targetQuestion = {
                ...targetQuestion,
                id: nextQuestionId++,
            }
            curQuestions.splice((action.index + 1), 0, targetQuestion)

            return curQuestions
        }
        case 'SET_QUESTION_TYPE': {
            const curQuestions = state.slice()
            curQuestions[action.index].type = action.questionType
            return curQuestions
        }
        case 'TOGGLE_QUESTION': {
            const curQuestions = state.slice()
            curQuestions[action.index].isRequired = !curQuestions[action.index].isRequired
            return curQuestions
        }
        case 'REMOVE_QUESTION': {
            const curQuestions = state.slice()
            curQuestions.splice(action.index, 1)
            return curQuestions
        }
        case 'ADD_OPTION': {
            const curQuestions = state.slice()
            const options = curQuestions[action.index].options
            options.push(`选项 ${options.length + 1}`)
            return curQuestions
        }
        case 'OPTION_CHANGE': {
            const curQuestions = state.slice()
            const options = curQuestions[action.questionIndex].options
            options[action.optionIndex] = action.event.target.value
            return curQuestions
        }
        case 'REMOVE_OPTION': {
            const curQuestions = state.slice()
            const options = curQuestions[action.questionIndex].options
            options.splice(action.optionIndex, 1)
            return curQuestions
        }
        case 'ADD_OTHER': {
            const curQuestions = state.slice()
            curQuestions[action.index].hasOther = true
            return curQuestions
        }
        case 'REMOVE_OTHER': {
            const curQuestions = state.slice()
            curQuestions[action.index].hasOther = false
            return curQuestions
        }
        default: {
            return state
        }
    }
}

export default questions
