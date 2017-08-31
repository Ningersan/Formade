import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Layout.scss'

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    saveText(title) {
        dispatch(questionnaireActions.saveText(title))
    },
    saveQuestionnaire() {
        dispatch(questionnaireActions.saveQuestionnaire())
    },
    fillQuestionnaire() {
        dispatch(questionnaireActions.fillQuestionnaire())
    },
})

class LayoutScreen extends React.Component {
    constructor() {
        super()
        this.handleScrollChange = this.handleScrollChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    componentWillMount() {
        document.addEventListener('scroll', this.handleScrollChange, false)
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScrollChange, false)
    }

    handleTitleChange(e) {
        this.props.saveText(e.target.value)
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

    handleInputFocus(e) {
        e.currentTarget.select()
    }

    render() {
        const headerLeft = (
            <div className={styles.left}>
                <Link
                  to="/"
                  className="fa fa-arrow-left fa-lg"
                  onClick={() => this.props.saveQuestionnaire()}
                />
                <input
                  type="text"
                  className={styles.title}
                  value={this.props.editing.title}
                  onChange={this.handleTitleChange}
                  onFocus={this.handleInputFocus}
                />
            </div>
        )

        const headerRight = (
            <div className={styles.right}>
                <Link
                  to="/fill"
                  className="fa fa-eye fa-lg"
                  onClick={this.props.saveQuestionnaire}
                />
                <Link to="/" className="fa fa-info fa-lg" />
                <a className={styles.save}>保存</a>
            </div>
        )

        const topFooter = (
            <div className={styles.footer}>
                <div className={styles.tab}>
                    <div className={styles['content-wrap']}>
                        <label>
                            <input
                              type="radio"
                              name="content"
                              className={styles.placeholder}
                              defaultChecked
                            />
                            <Link to="/edit" className={styles.content}>问题</Link>
                        </label>
                        <label>
                            <input type="radio" name="content" className={styles.placeholder} />
                            <Link
                              to="/response"
                              className={styles.content}
                            >回复</Link>
                        </label>
                    </div>
                </div>
            </div>
        )

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
                <div className={styles.main}>{this.props.children}</div>
            </div>
        )
    }
}

LayoutScreen.propTypes = {
    editing: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.element.isRequired,
    saveText: PropTypes.func.isRequired,
    saveQuestionnaire: PropTypes.func.isRequired,
}

const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutScreen)

export default Layout
