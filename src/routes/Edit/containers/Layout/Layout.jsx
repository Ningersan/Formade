import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
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
        this.state = {
            editIsActive: true,
        }
        this.handleScrollChange = this.handleScrollChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleTabClick = this.handleTabClick.bind(this)
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

    handleTabClick() {
        this.setState({
            editIsActive: !this.state.editIsActive,
        })
    }

    handleInputFocus(e) {
        e.currentTarget.select()
    }

    render() {
        const editorTabClassName = this.state.editIsActive ? `${styles.content} ${styles.active}` : styles.content
        const responseTabClassName = !this.state.editIsActive ? `${styles.content} ${styles.active}` : styles.content

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
                        <Link
                          to="/edit"
                          className={editorTabClassName}
                          onClick={this.handleTabClick}
                        >问题</Link>
                        <Link
                          to="/edit/response"
                          className={responseTabClassName}
                          onClick={this.handleTabClick}
                        >回复</Link>
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

export default withRouter(Layout)
