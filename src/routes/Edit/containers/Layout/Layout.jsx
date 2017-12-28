import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input } from '../../../../components/index'
import * as questionnaireActions from '../../../../actions/questionnaire'
import styles from './Layout.scss'

class Layout extends React.Component {
    static propTypes = {
        editing: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,
        children: PropTypes.element.isRequired,
        saveTitle: PropTypes.func.isRequired,
        saveQuestionnaire: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.state = { editIsActive: true }
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
        this.props.saveTitle(e.target.value, 'questionnaire')
    }

    handleScrollChange() {
        const topArea = this.topArea
        topArea.style.height = window.scrollY >= 58 ? '121px' : '176px'
        topArea.style.position = window.scrollY >= 58 ? 'fixed' : 'absolute'
    }

    handleTabClick() {
        this.setState(prevState => ({
            editIsActive: !prevState.editIsActive,
        }))
    }

    render() {
        const { editing, saveQuestionnaire, children } = this.props

        const editorTabClassName = classnames({
            [styles.content]: true,
            [styles.active]: this.state.editIsActive,
        })
        const responseTabClassName = classnames({
            [styles.content]: true,
            [styles.active]: !this.state.editIsActive,
        })

        const headerLeft = (
            <div className={styles.left}>
                <Link
                  to="/"
                  className={styles['backup-link']}
                  onClick={() => saveQuestionnaire()}
                >
                    <i className="iconfont icon-arrow-left" />
                </Link>
                <Input
                  autoSelect
                  className={styles.title}
                  value={editing.title}
                  handleChange={this.handleTitleChange}
                />
            </div>
        )

        const headerRight = (
            <div className={styles.right}>
                <Link
                  to="/fill"
                  className={styles['fill-link']}
                  onClick={saveQuestionnaire}
                >
                    <i className="iconfont icon-tianxie" />
                </Link>
                <Link to="/" className={styles['home-link']}>
                    <i className="iconfont icon-info" />
                </Link>
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
                <div className={styles.main}>{children}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    saveTitle(title, type) {
        dispatch(questionnaireActions.saveTitle(title, type))
    },
    saveQuestionnaire() {
        dispatch(questionnaireActions.saveQuestionnaire())
    },
    fillQuestionnaire() {
        dispatch(questionnaireActions.fillQuestionnaire())
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
