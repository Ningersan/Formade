import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Question from '../Question/Question'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Fill.scss'

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    chooseOption(questionId) {
        return (optionId, type) => {
            dispatch(questionnaireActions.chooseOption(questionId, optionId, type))
        }
    },
    saveText(questionId) {
        return (text) => {
            dispatch(questionnaireActions.saveText(text, questionId))
        }
    },
    submitQuestionnaire() {
        dispatch(questionnaireActions.submitQuestionnaire())
    },
})

class FillMain extends React.Component {
    constructor() {
        super()
        this.state = {
            isSubmit: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddResponse = this.handleAddResponse.bind(this)
    }

    handleSubmit() {
        this.props.submitQuestionnaire()
        this.setState({
            isSubmit: true,
        })
    }

    handleAddResponse() {
        this.setState({
            isSubmit: false,
        })
    }

    renderMessage() {
        return (
            <div className={styles['response-field']}>
                <span>您的回复已记录</span>
                <a
                  role="button"
                  tabIndex="-1"
                  className={styles['reanswer-link']}
                  onClick={this.handleAddResponse}
                >另填写一份回复</a>
            </div>
        )
    }

    render() {
        const questions = this.props.editing.questions
        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <div className={styles.link}>
                        <Link to="/edit" className="fa fa-pencil fa-lg" />
                    </div>
                </div>
                <form className={styles.main}>
                    <div className={styles.banner} />
                    <div className={styles.content}>
                        <div className={styles['form-title']}>未命名的表单</div>
                        {
                            !this.state.isSubmit ?
                            questions.map((question, index) => (
                                <Question
                                  key={index}
                                  title={question.title}
                                  type={question.type}
                                  options={question.options}
                                  handleChooseOption={this.props.chooseOption(index)}
                                  handleSaveText={this.props.saveText(index)}
                                />
                            ))
                            :
                            this.renderMessage()
                        }
                    </div>
                    {
                        !this.state.isSubmit &&
                        (
                            <div className={styles['submit-field']}>
                                <button
                                  type="button"
                                  className={styles['submit-button']}
                                  onClick={this.handleSubmit}
                                >提交</button>
                            </div>
                        )
                    }
                </form>
            </div>
        )
    }
}

FillMain.propTypes = {
    editing: PropTypes.shape({
        questions: PropTypes.array.isRequired,
    }).isRequired,
    chooseOption: PropTypes.func.isRequired,
    saveText: PropTypes.func.isRequired,
    submitQuestionnaire: PropTypes.func.isRequired,
}

const Fill = connect(mapStateToProps, mapDispatchToProps)(FillMain)

export default Fill
