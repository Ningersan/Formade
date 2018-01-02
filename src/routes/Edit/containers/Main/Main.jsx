import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Icon, Input, Textarea } from '../../../../components/index'
import Question from '../Question/Question'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Main.scss'

class Edit extends React.Component {
    static propTypes = {
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
        saveText: PropTypes.func.isRequired,
        saveTitle: PropTypes.func.isRequired,
        addQuestion: PropTypes.func.isRequired,
        setQuestionType: PropTypes.func.isRequired,
        toggleQuestion: PropTypes.func.isRequired,
        copyQuestion: PropTypes.func.isRequired,
        sortQuestion: PropTypes.func.isRequired,
        removeQuestion: PropTypes.func.isRequired,
        addOption: PropTypes.func.isRequired,
        editOption: PropTypes.func.isRequired,
        removeOption: PropTypes.func.isRequired,
        addOther: PropTypes.func.isRequired,
        removeOther: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.handleSaveText = this.handleSaveText.bind(this)
        this.handleSaveTitle = this.handleSaveTitle.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAddQuestion = this.handleAddQuestion.bind(this)
        this.handleSetQuestionType = this.handleSetQuestionType.bind(this)
        this.handleToggleQuestion = this.handleToggleQuestion.bind(this)
        this.handleCopyQuestion = this.handleCopyQuestion.bind(this)
        this.handleSortQuestion = this.handleSortQuestion.bind(this)
        this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleEditOption = this.handleEditOption.bind(this)
        this.handleRemoveOption = this.handleRemoveOption.bind(this)
        this.handleAddOther = this.handleAddOther.bind(this)
        this.handleRemoveOther = this.handleRemoveOther.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDragEnter = this.handleDragEnter.bind(this)
    }

    handleTitleChange(e) {
        this.handleSaveTitle(null)(e.target.value.trim(), 'questionnaire')
    }

    handleSaveText(type) {
        const { saveText } = this.props
        return text => saveText(text, type)
    }

    handleSaveTitle(questionIndex) {
        const { saveTitle } = this.props
        return (title, type) => saveTitle(title, type, questionIndex)
    }

    handleAddQuestion(type) {
        const { addQuestion } = this.props
        addQuestion(type)
    }

    handleSetQuestionType(index) {
        const { setQuestionType } = this.props
        return type => setQuestionType(index, type)
    }

    handleToggleQuestion(index) {
        const { toggleQuestion } = this.props
        toggleQuestion(index)
    }

    handleCopyQuestion(index) {
        const { copyQuestion } = this.props
        copyQuestion(index)
    }

    handleSortQuestion(sourceIndex, targetIndex) {
        const { sortQuestion } = this.props
        sortQuestion(sourceIndex, targetIndex)
    }

    handleRemoveQuestion(index) {
        const { removeQuestion } = this.props
        removeQuestion(index)
    }

    handleAddOption(index) {
        const { addOption } = this.props
        addOption(index)
    }

    handleEditOption(questionIndex) {
        const { editOption } = this.props
        return optionIndex => e => editOption(questionIndex, optionIndex, e)
    }

    handleRemoveOption(questionIndex) {
        const { removeOption } = this.props
        return optionIndex => removeOption(questionIndex, optionIndex)
    }

    handleAddOther(index) {
        const { addOther } = this.props
        addOther(index)
    }

    handleRemoveOther(index) {
        const { removeOther } = this.props
        removeOther(index)
    }

    handleDragStart(index) {
        return (e) => {
            this.currentMouseY = e.pageY
            e.dataTransfer.effectAllowed = 'move'
            this.dragElement = e.currentTarget
            this.dragElementIndex = index
        }
    }

    handleDragEnter(index) {
        return (e) => {
            event.preventDefault()

            const dragElement = this.dragElement
            const lastChild = dragElement.parentNode.lastElementChild
            const nextToLastChild = lastChild.previousElementSibling
            const upEnterElement = dragElement.previousElementSibling.previousElementSibling
            let downEnterElement = null

            if (dragElement === lastChild) {
                downEnterElement = null
            } else if (dragElement === nextToLastChild) {
                downEnterElement = dragElement.nextElementSibling
            } else {
                downEnterElement = dragElement.nextElementSibling.nextElementSibling
            }

            if (e.target === upEnterElement || e.target === downEnterElement) {
                let placeholder = null
                const targetElement = e.target === upEnterElement ? dragElement.previousElementSibling : downEnterElement
                let targetIndex = e.target === upEnterElement ? index + 1 : index - 1

                if (e.target === downEnterElement && downEnterElement === lastChild) {
                    targetIndex++
                }

                placeholder = this.creatPlaceholder(this.dragElementIndex, targetIndex)
                dragElement.style.display = 'none'

                if (e.target === downEnterElement && downEnterElement === lastChild) {
                    dragElement.parentNode.appendChild(placeholder)
                } else {
                    dragElement.parentNode.insertBefore(placeholder, targetElement)
                }
            }
        }
    }

    creatPlaceholder(from, to) {
        const dragElement = this.dragElement
        const placeholder = document.createElement('div')

        placeholder.className = styles.placeholder
        placeholder.style.width = `${dragElement.offsetWidth}px`
        placeholder.style.height = `${dragElement.offsetHeight}px`

        placeholder.addEventListener('drop', () => {
            this.handleSortQuestion(from, to)
            dragElement.style.display = 'block'
            dragElement.parentNode.removeChild(placeholder)
        }, false)
        placeholder.addEventListener('dragover', (e) => {
            e.preventDefault()
        }, false)
        placeholder.addEventListener('dragleave', () => {
            dragElement.parentNode.removeChild(placeholder)
        }, false)

        return placeholder
    }

    renderHeader() {
        const { editing } = this.props
        return (
            <div
              tabIndex="-1"
              className={styles.header}
              onDragEnter={this.handleDragEnter(-1)}
            >
                <div className={styles.info}>
                    <Input
                      autoSelect
                      className={styles.title}
                      value={editing.title}
                      handleChange={this.handleTitleChange}
                    />
                    <Textarea
                      className={styles.description}
                      placeholder="表单说明"
                      value={editing.description}
                      handleSaveText={this.handleSaveText('description')}
                    />
                </div>
            </div>
        )
    }

    renderMenu() {
        return (
            <Menu
              wrapClassName={styles.menu}
              itemClassName={styles['menu-item']}
            >
                <Icon
                  wrapClassName={styles['add-question-button']}
                  className={'iconfont icon-radiobutton'}
                  handleClick={() => this.handleAddQuestion('radio')}
                />
                <Icon
                  wrapClassName={styles['add-question-button']}
                  className={'iconfont icon-check-box'}
                  handleClick={() => this.handleAddQuestion('checkbox')}
                />
                <Icon
                  wrapClassName={styles['add-question-button']}
                  className={'iconfont icon-text'}
                  handleClick={() => this.handleAddQuestion('text')}
                />
            </Menu>
        )
    }

    render() {
        const { editing: { questions } } = this.props

        return (
            <div className={styles.wrap}>
                {this.renderMenu()}
                {this.renderHeader()}
                {questions.map((question, index) => (
                    <Question
                      key={question.id}
                      title={question.title}
                      type={question.type}
                      options={question.options}
                      handleDragStart={this.handleDragStart(index)}
                      handleDragEnter={this.handleDragEnter(index)}
                      hasOther={question.hasOther}
                      handleSaveTitle={this.handleSaveTitle(index)}
                      handleSetQuestionType={this.handleSetQuestionType(index)}
                      handleToggleQuestion={() => this.handleToggleQuestion(index)}
                      handleCopyQuestion={() => this.handleCopyQuestion(index)}
                      handleRemoveQuestion={() => this.handleRemoveQuestion(index)}
                      handleAddOption={() => this.handleAddOption(index)}
                      handleOptionChange={this.handleEditOption(index)}
                      handleRemoveOption={this.handleRemoveOption(index)}
                      handleAddOther={() => this.handleAddOther(index)}
                      handleRemoveOther={() => this.handleRemoveOther(index)}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    saveTitle(title, type, questionIndex) {
        dispatch(questionnaireActions.saveTitle(title, type, questionIndex))
    },
    saveText(text, type) {
        dispatch(questionnaireActions.saveText(text, type))
    },
    addQuestion(type) {
        dispatch(questionnaireActions.addQuestion(type))
    },
    setQuestionType(index, type) {
        dispatch(questionnaireActions.setQuestionType(index, type))
    },
    toggleQuestion(index) {
        dispatch(questionnaireActions.toggleQuestion(index))
    },
    copyQuestion(index) {
        dispatch(questionnaireActions.copyQuestion(index))
    },
    sortQuestion(sourceIndex, targetIndex) {
        dispatch(questionnaireActions.sortQuestion(sourceIndex, targetIndex))
    },
    removeQuestion(index) {
        dispatch(questionnaireActions.removeQuestion(index))
    },
    addOption(index) {
        dispatch(questionnaireActions.addOption(index))
    },
    editOption(questionIndex, optionIndex, e) {
        dispatch(questionnaireActions.editOption(questionIndex, optionIndex, e))
    },
    removeOption(questionIndex, optionIndex) {
        dispatch(questionnaireActions.removeOption(questionIndex, optionIndex))
    },
    addOther(index) {
        dispatch(questionnaireActions.addOther(index))
    },
    removeOther(index) {
        dispatch(questionnaireActions.removeOther(index))
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))
