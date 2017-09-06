import React from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import styles from './Chart.scss'

class Chart extends React.Component {
    componentDidMount() {
        const myChart = echarts.init(this.div)
        myChart.setOption(this.props.option)
        window.addEventListener('resize', () => { myChart.resize() }, false)
    }
    render() {
        return (
            <div className={styles['chart-container']} ref={(el) => { this.div = el }} />
        )
    }
}

Chart.propTypes = {
    option: PropTypes.object.isRequired,
}

export default Chart
