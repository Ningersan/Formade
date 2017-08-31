import React from 'react'
import PropTypes from 'prop-types'
import echarts from '../../../../scripts/echarts'
import styles from './Chart.scss'

class Chart extends React.Component {
    componentDidMount() {
        const myChart = echarts.init(this.div)
        myChart.setOption(this.props.option)
    }
    render() {
        return (
            <div className={styles.test} ref={(el) => { this.div = el }} />
        )
    }
}

export default Chart
