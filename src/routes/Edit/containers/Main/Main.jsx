import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Menu from '../../../../components/Menu/Menu'
import Textarea from '../../../../components/Textarea/Textarea'
import Question from '../Question/Question'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Main.scss'

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    saveTitle(questionIndex) {
        return (title, type) => {
            dispatch(questionnaireActions.saveTitle(title, type, questionIndex))
        }
    },
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
    editOption(questionIndex) {
        return optionIndex => (e) => {
            dispatch(questionnaireActions.editOption(questionIndex, optionIndex, e))
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
        this.handleTitleFocus = this.handleTitleFocus.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    handleTitleFocus() {
        this.titleInput.select()
    }

    handleTitleChange(e) {
        this.props.saveTitle(null)(e.target.value, 'questionnaire')
    }

    render() {
        const header = (
            <div tabIndex="-1" className={styles.header}>
                <div className={styles.info}>
                    <input
                      type="text"
                      className={styles.title}
                      value={this.props.editing.title}
                      onFocus={this.handleTitleFocus}
                      onChange={this.handleTitleChange}
                      ref={(input) => { this.titleInput = input }}
                    />
                    <Textarea
                      className={styles.description}
                      placeholder="表单说明"
                    />
                </div>
            </div>
        )

        const menuStyle = {
            top: '30%',
            right: '15%',
        }

        const menu = (
            <Menu
              wrapClassName={styles.menu}
              wrapStyle={menuStyle}
            >
                <div
                  role="button"
                  tabIndex="0"
                  title="添加单选"
                  className={styles['add-question']}
                  onClick={() => this.props.addQuestion('radio')}
                >
                    <i className="fa fa-circle-o fa-lg" />
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  title="添加多选"
                  className={styles['add-question']}
                  onClick={() => this.props.addQuestion('checkbox')}
                >
                    <i className="fa fa-check-square fa-lg" />
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  title="添加文本"
                  className={styles['add-question']}
                  onClick={() => this.props.addQuestion('text')}
                >
                    <i className="fa fa-pencil-square-o fa-lg" />
                </div>
            </Menu>
        )

        const questions = this.props.editing.questions

        return (
            <div className={styles.wrap}>
                {menu}
                {header}
                {questions.map((question, index) => (
                    <Question
                      key={question.id}
                      title={question.title}
                      type={question.type}
                      options={question.options}
                      hasOther={question.hasOther}
                      handleSaveTitle={this.props.saveTitle(index)}
                      handleSetQuestionType={this.props.setQuestionType(index)}
                      handleToggleQuestion={() => this.props.toggleQuestion(index)}
                      handleCopyQuestion={() => this.props.copyQuestion(index)}
                      handleRemoveQuestion={() => this.props.removeQuestion(index)}
                      handleAddOption={() => this.props.addOption(index)}
                      handleOptionChange={this.props.editOption(index)}
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
    editing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                hasOther: PropTypes.bool.isRequired,
                options: PropTypes.array.isRequired,
            }).isRequired).isRequired,
    }).isRequired,
    saveTitle: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    setQuestionType: PropTypes.func.isRequired,
    toggleQuestion: PropTypes.func.isRequired,
    copyQuestion: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    addOption: PropTypes.func.isRequired,
    editOption: PropTypes.func.isRequired,
    removeOption: PropTypes.func.isRequired,
    addOther: PropTypes.func.isRequired,
    removeOther: PropTypes.func.isRequired,
}

const Main = connect(mapStateToProps, mapDispatchToProps)(EditMain)

export default Main
