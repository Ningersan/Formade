import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu/Menu'
import Question from '../Question/Question'
import { deepCopy } from '../../../../scripts/utils.js'
import styles from './Main.scss'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            questions: [{
                options: ['选项 1', '选项 2'],
                type: 'radio',
            }],
        }
        this.handleFocus = this.handleFocus.bind(this)
        this.handleDescBlur = this.handleDescBlur.bind(this)
        this.handleAddQuestion = this.handleAddQuestion.bind(this)
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this)
        this.handleCopyQuestion = this.handleCopyQuestion.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
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

    handleAddQuestion(type) {
        const questions = Array.from(this.state.questions)
        questions.push({
            options: ['选项 1', '选项 2'],
            type,
        })
        this.setState({
            questions,
        })
    }

    handleDeleteQuestion(index) {
        const questions = Array.from(this.state.questions)
        questions.splice(index, 1)
        this.setState({
            questions,
        })
    }

    handleCopyQuestion(index) {
        console.log(deepCopy)
        const questions = this.state.questions.slice()
        const targetQuestion = deepCopy(questions[index])
        questions.splice((index + 1), 0, targetQuestion)
        this.setState({
            questions,
        })
    }

    handleAddOption(index) {
        const questions = Array.from(this.state.questions)
        const options = questions[index].options
        options.push(`选项 ${options.length + 1}`)
        this.setState({
            questions,
        })
    }

    handleDeleteOption(questionIndex) {
        return (optionIndex) => {
            const questions = Array.from(this.state.questions)
            const options = questions[questionIndex].options
            options.splice(optionIndex, 1)
            this.setState({
                questions,
            })
        }
    }

    handleOptionChange(questionIndex) {
        return optionIndex => (e) => {
            const questions = Array.from(this.state.questions)
            questions[questionIndex].options[optionIndex] = e.target.value
            this.setState({
                questions,
            })
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

        return (
            <div className={styles.wrap}>
                <Menu handleAddQuestion={this.handleAddQuestion} />
                {header}
                {this.state.questions.map((option, index) => (
                    <Question
                      key={index}
                      type={this.state.questions[index].type}
                      options={this.state.questions[index].options}
                      handleAddOption={() => this.handleAddOption(index)}
                      handleDeleteOption={this.handleDeleteOption(index)}
                      handleOptionChange={this.handleOptionChange(index)}
                      handleDeleteQuestion={() => this.handleDeleteQuestion(index)}
                      handleCopyQuestion={() => this.handleCopyQuestion(index)}
                    />
                ))}
            </div>
        )
    }
}

Main.propTypes = {
    title: PropTypes.string,
    handleTitleChange: PropTypes.func,
}

export default Main
