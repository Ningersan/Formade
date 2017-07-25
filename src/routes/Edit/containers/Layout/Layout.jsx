import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import store from '../../../../index'
import styles from './Layout.scss'

class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '未命名的表单',
        }
        this.handleScrollChange = this.handleScrollChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    componentWillMount() {
        document.addEventListener('scroll', this.handleScrollChange, false)
    }

    componentWillUnMount() {
        document.removeEventListener('scroll', this.handleScrollChange, false)
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleScrollChange() {
        const topArea = this.topArea
        if (window.scrollY >= 58) {
            topArea.style.height = '121px'
            topArea.style.position = 'fixed'
        } else {
            topArea.style.height = '176px'
            topArea.style.position = 'absolute'
        }
    }

    handleBackHome() {
        console.log(store.getState())
    }

    render() {
        const headerLeft = (
            <div className={styles.left}>
                <Link to="/" className="fa fa-arrow-left fa-lg" onClick={this.handleBackHome} />
                <input
                  type="text"
                  className={styles.title}
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
            </div>
        )

        const headerRight = (
            <div className={styles.right}>
                <Link to="/" className="fa fa-eye fa-lg" />
                <Link to="/" className="fa fa-info fa-lg" />
                <button className={styles.save}>保存</button>
            </div>
        )

        const topFooter = (
            <div className={styles.footer}>
                <div className={styles.tab}>
                    <span className={styles.question}>问题</span>
                </div>
            </div>
        )

        const main = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                title: this.state.title,
                handleTitleChange: this.handleTitleChange,
            }))

        const topAreaStyle = {
            position: 'absolute',
        }

        return (
            <div>
                <div
                  ref={el => (this.topArea = el)}
                  className={styles.top}
                  style={topAreaStyle}
                >
                    <div className={styles.header}>
                        {headerLeft}
                        {headerRight}
                    </div>
                    {topFooter}
                </div>
                <div className="Main">{main}</div>
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.element.isRequired,
}

export default Layout
