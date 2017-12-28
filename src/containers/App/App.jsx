import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Home from '../Home/Home'
import styles from './App.scss'

class App extends Component {
    constructor() {
        super()
        this.state = { isOpen: false }
        this.showSiderbar = this.showSiderbar.bind(this)
        this.hideSiderbar = this.hideSiderbar.bind(this)
    }

    componentWillMount() {
        // 点击siderbar外部区域，自动隐藏侧边栏
        window.document.addEventListener('click', this.hideSiderbar)
    }

    componentWillUnmount() {
        window.document.removeEventListener('click', this.hideSiderbar)
    }

    showSiderbar() {
        this.setState({
            isOpen: true,
        })
    }

    hideSiderbar(e) {
        if (e.target !== this.siderbar && e.target !== this.menuBtn) {
            this.setState({
                isOpen: false,
            })
        }
    }

    renderSiderbar() {
        return (
            <CSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
                { this.state.isOpen && <Siderbar navRef={el => (this.siderbar = el)} /> }
            </CSSTransitionGroup>
        )
    }

    render() {
        const siderbar = (
            <CSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
                {this.state.isOpen && <Siderbar navRef={el => (this.siderbar = el)} />}
            </CSSTransitionGroup>
        )

        return (
            <div className={styles.container}>
                <Header onClick={this.showSiderbar} btnRef={el => (this.menuBtn = el)} />
                {siderbar}
                <Home />
            </div>
        )
    }
}

export default App
