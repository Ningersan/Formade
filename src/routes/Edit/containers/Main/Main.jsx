import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Input, Textarea } from '../../../../components/index'
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
        this.state = { offsetY: 0 }
        this.handleTitleFocus = this.handleTitleFocus.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDragEnter = this.handleDragEnter.bind(this)
    }

    handleTitleFocus() {
        this.titleInput.select()
    }

    handleTitleChange(e) {
        this.props.saveTitle(null)(e.target.value, 'questionnaire')
    }

    handleDragStart(index) {
        return (e) => {
            this.currentMouseY = e.pageY
            console.log(this.currentMouseY)
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

    handleDrag(e) {
        this.setState({
            offsetY: e.pageY - this.currentMouseY,
        })
        console.log(e.pageY - this.currentMouseY)
    }

    creatPlaceholder(from, to) {
        const dragElement = this.dragElement
        const placeholder = document.createElement('div')

        placeholder.className = styles.placeholder
        placeholder.style.width = `${dragElement.offsetWidth}px`
        placeholder.style.height = `${dragElement.offsetHeight}px`

        placeholder.addEventListener('drop', () => {
            this.props.sortQuestion(from, to)
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

    render() {
        const { editing, saveText, addQuestion, saveTitle, setQuestionType,
            toggleQuestion, copyQuestion, removeQuestion, addOption,
            editOption, removeOption, addOther, removeOther,
         } = this.props

        const header = (
            <div
              tabIndex="-1"
              className={styles.header}
              onDragEnter={this.handleDragEnter(-1)}
            >
                <div className={styles.info}>
                    <Input
                      className={styles.title}
                      value={editing.title}
                      onChange={this.handleTitleChange}
                    />
                    <Textarea
                      className={styles.description}
                      placeholder="表单说明"
                      onSaveText={saveText('description')}
                    />
                </div>
            </div>
        )

        const menu = (
            <Menu
              wrapClassName={styles.menu}
              itemClassName={styles['menu-item']}
            >
                <div
                  role="button"
                  tabIndex="0"
                  title="添加单选"
                  className={styles['add-question']}
                  onClick={() => addQuestion('radio')}
                >
                    <a className={styles['radio-button']}><i className="iconfont icon-radiobutton" /></a>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  title="添加多选"
                  className={styles['add-question']}
                  onClick={() => addQuestion('checkbox')}
                >
                    <a className={styles['checkbox-button']}><i className="iconfont icon-check-box" /></a>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  title="添加文本"
                  className={styles['add-question']}
                  onClick={() => addQuestion('text')}
                >
                    <a className={styles['text-button']}><i className="iconfont icon-text" /></a>
                </div>
            </Menu>
        )

        const questions = editing.questions

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
                      offsetY={this.state.offsetY}
                      handleDrag={this.handleDrag}
                      handleDragStart={this.handleDragStart(index)}
                      handleDragEnter={this.handleDragEnter(index)}
                      hasOther={question.hasOther}
                      handleSaveTitle={saveTitle(index)}
                      handleSetQuestionType={setQuestionType(index)}
                      handleToggleQuestion={() => toggleQuestion(index)}
                      handleCopyQuestion={() => copyQuestion(index)}
                      handleRemoveQuestion={() => removeQuestion(index)}
                      handleAddOption={() => addOption(index)}
                      handleOptionChange={editOption(index)}
                      handleRemoveOption={removeOption(index)}
                      handleAddOther={() => addOther(index)}
                      handleRemoveOther={() => removeOther(index)}
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
    saveTitle(questionIndex) {
        return (title, type) => {
            dispatch(questionnaireActions.saveTitle(title, type, questionIndex))
        }
    },
    saveText(type) {
        return (text) => {
            dispatch(questionnaireActions.saveText(text, type))
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
    sortQuestion(sourceIndex, targetIndex) {
        dispatch(questionnaireActions.sortQuestion(sourceIndex, targetIndex))
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))
