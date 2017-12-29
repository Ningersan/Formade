import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Home from '../Home/Home'
import styles from './App.scss'

class App extends Component {
    constructor() {
        super()
        this.state = { isSiderbarOpen: false }
        this.handleOpenSiderbar = this.handleOpenSiderbar.bind(this)
        this.handleCloseSiderbar = this.handleCloseSiderbar.bind(this)
    }

    componentDidMount() {
        // 点击siderbar外部区域，自动隐藏侧边栏
        document.addEventListener('click', this.handleCloseSiderbar)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleCloseSiderbar)
    }

    handleOpenSiderbar() {
        this.setState({ isSiderbarOpen: true })
    }

    handleCloseSiderbar(e) {
        if (e.target !== this.siderbar && e.target !== this.menu) {
            this.setState({ isSiderbarOpen: false })
        }
    }

    renderSiderbar() {
        return (
            <CSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
                { this.state.isSiderbarOpen && <Siderbar siderRef={el => (this.siderbar = el)} /> }
            </CSSTransitionGroup>
        )
    }

    render() {
        return (
            <div className={styles.container}>
                <Header onClick={this.handleOpenSiderbar} btnRef={el => (this.menu = el)} />
                {this.renderSiderbar()}
                <Home />
            </div>
        )
    }
}

export default App
