import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Icon, Input, Textarea } from '../../../../components/index'
import Question from '../Question/Question'
import { QUESTION_TYPES } from '../../../../constants/CommonConstants'
import * as formActions from '../../../../actions/formActions'
import * as questionActions from '../../../../actions/questionActions'
import * as utils from '../../../../scripts/utils'
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
        actions: PropTypes.shape({
            saveText: PropTypes.func.isRequired,
            saveFormTitle: PropTypes.func.isRequired,
            saveQuestionTitle: PropTypes.func.isRequired,
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
        }).isRequired,
    }

    constructor() {
        super()
        this.handleSaveText = this.handleSaveText.bind(this)
        this.handleSaveQuestionTitle = this.handleSaveQuestionTitle.bind(this)
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
        const title = e.target.value.trim()
        this.handleSaveFormTitle(title)
    }

    handleSaveText(type) {
        const { saveText } = this.props.actions
        return text => saveText(text, type)
    }

    handleSaveFormTitle(title) {
        const { saveFormTitle } = this.props.formActions
        saveFormTitle(title)
    }

    handleSaveQuestionTitle(id) {
        const { saveQuestionTitle } = this.props.actions
        return title => saveQuestionTitle(id, title)
    }

    handleAddQuestion(type) {
        const { addQuestion } = this.props.actions
        addQuestion(utils.guid(), type)
    }

    handleSetQuestionType(id) {
        const { setQuestionType } = this.props.actions
        return type => setQuestionType(id, type)
    }

    handleToggleQuestion(id) {
        const { toggleQuestion } = this.props.actions
        toggleQuestion(id)
    }

    handleCopyQuestion(id) {
        const { copyQuestion } = this.props.actions
        copyQuestion(id)
    }

    handleSortQuestion(sourceId, targetId) {
        const { sortQuestion } = this.props.actions
        sortQuestion(sourceId, targetId)
    }

    handleRemoveQuestion(id) {
        const { removeQuestion } = this.props.actions
        removeQuestion(id)
    }

    handleAddOption(questionId) {
        const { addOption } = this.props.actions
        addOption(questionId)
    }

    handleEditOption(questionId) {
        const { editOption } = this.props.actions
        return optionId => e => editOption(questionId, optionId, e)
    }

    handleRemoveOption(questionId) {
        const { removeOption } = this.props.actions
        return optionId => removeOption(questionId, optionId)
    }

    handleAddOther(questionId) {
        const { addOther } = this.props.actions
        addOther(questionId)
    }

    handleRemoveOther(questionId) {
        const { removeOther } = this.props.actions
        removeOther(questionId)
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
                      onChange={this.handleTitleChange}
                    />
                    <Textarea
                      className={styles.description}
                      placeholder="表单说明"
                      value={editing.description}
                      onSaveText={this.handleSaveText('description')}
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
                {Object.keys(QUESTION_TYPES).map((key, index) => (
                    <Icon
                      key={index}
                      wrapClassName={styles['add-question-button']}
                      className={QUESTION_TYPES[key].className}
                      onClick={() => this.handleAddQuestion(key)}
                    />
                ))}
            </Menu>
        )
    }

    render() {
        const { editing, questionById, questionIds } = this.props
        return (
            <div className={styles.wrap}>
                {this.renderMenu()}
                {this.renderHeader()}
                {questionIds.map(id => (
                    <Question
                      key={questionById[id].id}
                      title={questionById[id].title}
                      type={questionById[id].type}
                      options={questionById[id].options}
                      handleDragStart={this.handleDragStart(id)}
                      handleDragEnter={this.handleDragEnter(id)}
                      hasOther={questionById[id].hasOther}
                      handleSaveQuestionTitle={this.handleSaveQuestionTitle(id)}
                      handleSetQuestionType={this.handleSetQuestionType(id)}
                      handleToggleQuestion={() => this.handleToggleQuestion(id)}
                      handleCopyQuestion={() => this.handleCopyQuestion(id)}
                      handleRemoveQuestion={() => this.handleRemoveQuestion(id)}
                      handleAddOption={() => this.handleAddOption(id)}
                      handleOptionChange={this.handleEditOption(id)}
                      handleRemoveOption={this.handleRemoveOption(id)}
                      handleAddOther={() => this.handleAddOther(id)}
                      handleRemoveOther={() => this.handleRemoveOther(id)}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editing: state.editing,
    questionIds: state.editing.questions,
    questionById: state.questions.byId,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(questionActions, dispatch),
    formActions: bindActionCreators({
        saveFormTitle: formActions.saveFormTitle,
    }, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))
