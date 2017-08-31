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
    saveText(questionId, type) {
        return (text) => {
            dispatch(questionnaireActions.saveText(text, type, questionId))
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
            isFilled: [],
        }
        this.getUnfilledIndex = this.getUnfilledIndex.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddResponse = this.handleAddResponse.bind(this)
        this.handleFill = this.handleFill.bind(this)
    }

    componentWillMount() {
        this.setState({
            isFilled: Array(this.props.editing.questions.length).fill(false),
        })
    }

    getUnfilledIndex() {
        const requiredIndexs = []
        const { data, questions } = this.props.editing
        const checkRequiredIndex = (questionIndex) => {
            const answer = data[questionIndex]
            return (answer === undefined || answer.length === 0)
        }
        questions.forEach((question, index) => {
            if (question.isRequired) {
                requiredIndexs.push(index)
            }
        })
        return data.length === 0 ? requiredIndexs : requiredIndexs.filter(checkRequiredIndex)
    }

    handleSubmit() {
        const unfilledIndexArr = this.getUnfilledIndex()
        if (unfilledIndexArr.length === 0) {
            this.setState({
                isSubmit: true,
            })
            this.props.submitQuestionnaire()
        } else {
            const { isFilled } = this.state
            unfilledIndexArr.forEach((index) => {
                isFilled[index] = true
            })
            this.setState({
                isFilled,
            })
        }
    }

    handleAddResponse() {
        this.setState({
            isSubmit: false,
        })
    }

    handleFill(index) {
        const { isFilled } = this.state
        isFilled[index] = false
        this.setState({
            isFilled,
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
        const hasRequired = questions.some((question) => {
            return question.isRequired
        })
        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <div className={styles.link}>
                        <Link
                          to="/edit"
                          className="fa fa-pencil fa-lg"
                        />
                    </div>
                </div>
                <form className={styles.main}>
                    <div className={styles.banner} />
                    <div className={styles.content}>
                        <div className={styles['form-title']}>{this.props.editing.title}</div>
                        {hasRequired &&
                        (<div className={styles.tips}><span className={styles['tips-text']}>*必填</span></div>)}
                        {
                            !this.state.isSubmit ?
                            questions.map((question, index) => (
                                <Question
                                  key={index}
                                  isFilled={this.state.isFilled[index]}
                                  title={question.title}
                                  type={question.type}
                                  isRequired={question.isRequired}
                                  options={question.options}
                                  handleFill={() => { this.handleFill(index) }}
                                  handleChooseOption={this.props.chooseOption(index)}
                                  handleSaveText={this.props.saveText(index, 'answer')}
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
        title: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
    }).isRequired,
    chooseOption: PropTypes.func.isRequired,
    saveText: PropTypes.func.isRequired,
    submitQuestionnaire: PropTypes.func.isRequired,
}

const Fill = connect(mapStateToProps, mapDispatchToProps)(FillMain)

export default Fill
