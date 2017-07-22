import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Menu from '../Menu/Menu'
import Question from '../Question/Question'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Main.scss'

const mapStateToProps = state => ({
    questions: state,
})

const mapDispatchToProps = dispatch => ({
    addQuestion(type) {
        dispatch(questionnaireActions.addQuestion(type))
    },
    setQuestionType(index) {
        return (type) => {
            dispatch(questionnaireActions.setQuestionType(index, type))
        }
    },
    toggleQuestion(index) {
        dispatch(questionnaireActions.toggleQuestion(index))
    },
    copyQuestion(index) {
        dispatch(questionnaireActions.copyQuestion(index))
    },
    removeQuestion(index) {
        dispatch(questionnaireActions.removeQuestion(index))
    },
    addOption(index) {
        dispatch(questionnaireActions.addOption(index))
    },
    optionChange(questionIndex) {
        return optionIndex => (e) => {
            dispatch(questionnaireActions.optionChange(questionIndex, optionIndex, e))
        }
    },
    removeOption(questionIndex) {
        return (optionIndex) => {
            dispatch(questionnaireActions.removeOption(questionIndex, optionIndex))
        }
    },
    addOther(index) {
        dispatch(questionnaireActions.addOther(index))
    },
    removeOther(index) {
        dispatch(questionnaireActions.removeOther(index))
    },
})

class EditMain extends React.Component {
    constructor() {
        super()
        this.handleFocus = this.handleFocus.bind(this)
        this.handleDescBlur = this.handleDescBlur.bind(this)
    }

    handleFocus(e) {
        if (e.target === this.titleInput) {
            this.titleInput.select()
        } else {
            this.descriptionInput.dataset.content = ''
        }
    }

    handleDescBlur() {
        if (this.descriptionInput.textContent === '') {
            this.descriptionInput.dataset.content = '表单说明'
        }
    }

    render() {
        const header = (
            <div tabIndex="-1" className={styles.header}>
                <div className={styles.info}>
                    <input
                      type="text"
                      className={styles.title}
                      value={this.props.title}
                      onFocus={this.handleFocus}
                      onChange={this.props.handleTitleChange}
                      ref={(input) => { this.titleInput = input }}
                    />
                    <div
                      contentEditable="true"
                      data-content="表单说明"
                      className={styles.description}
                      onFocus={this.handleFocus}
                      onBlur={this.handleDescBlur}
                      ref={(input) => { this.descriptionInput = input }}
                    />
                </div>
            </div>
        )
        const questions = this.props.questions

        return (
            <div className={styles.wrap}>
                <Menu handleAddQuestion={this.props.addQuestion} />
                {header}
                {questions.map((question, index) => (
                    <Question
                      key={question.id}
                      type={questions[index].type}
                      options={questions[index].options}
                      hasOther={questions[index].hasOther}
                      handleSetQuestionType={this.props.setQuestionType(index)}
                      handleToggleQuestion={() => this.props.toggleQuestion(index)}
                      handleCopyQuestion={() => this.props.copyQuestion(index)}
                      handleRemoveQuestion={() => this.props.removeQuestion(index)}
                      handleAddOption={() => this.props.addOption(index)}
                      handleOptionChange={this.props.optionChange(index)}
                      handleRemoveOption={this.props.removeOption(index)}
                      handleAddOther={() => this.props.addOther(index)}
                      handleRemoveOther={() => this.props.removeOther(index)}
                    />
                ))}
            </div>
        )
    }
}

EditMain.propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            hasOther: PropTypes.bool.isRequired,
            options: PropTypes.array.isRequired,
        }).isRequired
    ).isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    setQuestionType: PropTypes.func.isRequired,
    toggleQuestion: PropTypes.func.isRequired,
    copyQuestion: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    addOption: PropTypes.func.isRequired,
    optionChange: PropTypes.func.isRequired,
    removeOption: PropTypes.func.isRequired,
    addOther: PropTypes.func.isRequired,
    removeOther: PropTypes.func.isRequired,
}

const Main = connect(mapStateToProps, mapDispatchToProps)(EditMain)

export default Main
