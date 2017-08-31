import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../Layout/Layout'
import Chart from '../Chart/Chart'
import styles from './Response.scss'

const mapStateToProps = state => ({
    editing: state.editing,
    questionnaires: state.list || [],
})

class Answer extends React.Component {
    renderChart(question, questionIndex, data) {
        const statistic = []
        const { type, options } = question
        switch (type) {
            case 'radio': {
                data.forEach((answer) => {
                    const optionIndex = answer[questionIndex]
                    const option = options[optionIndex]
                    statistic[optionIndex] ? statistic[optionIndex].value++ : statistic[optionIndex] = { name: option, value: 1 }
                })
                options.forEach((option, index) => {
                    if (!statistic[index]) {
                        statistic[index] = { name: option, value: 0 }
                    }
                })
                const configure = {
                    title: {
                        text: question.title,
                    },
                    series: {
                        name: question.title,
                        type: 'pie',
                        radius: '50%',
                        data: statistic,
                    },
                }
                console.log(configure)
                return (
                    <Chart option={configure} />
                )
            }
            case 'checkbox': {
                data.forEach((answer) => {
                    answer[questionIndex].forEach((optionIndex) => {
                        statistic[optionIndex] = statistic[optionIndex] + 1 || 1
                    })
                })
                options.forEach((option, index) => {
                    if (!statistic[index]) {
                        statistic[index] = 0
                    }
                })
                const configure = {
                    title: {
                        text: question.title,
                    },
                    tooltip: {},
                    legend: {
                        data: ['人数'],
                    },
                    xAxis: {},
                    yAxis: {
                        data: options,
                    },
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: Object.keys(statistic).map(v => statistic[v]),
                    }],
                }
                return (
                    <Chart option={configure} />
                )
            }
            default: break
        }
    }
    render() {
        const { questionnaires, editing } = this.props
        const questionnaire = questionnaires[editing.questionnaireId]
        const data = questionnaire ? questionnaire.data : []
        console.log(data)
        return (
            <Layout>
                <div>
                    <div className={styles['response-number']}>{`（${data.length}条回复）`}</div>
                    {
                        data.length ?
                        questionnaire.questions.map((question, index) => (
                            <div key={index}>
                                {this.renderChart(question, index, data)}
                            </div>
                        ))
                        : null
                    }
                </div>
            </Layout>
        )
    }
}

const Response = connect(mapStateToProps)(Answer)

export default Response
