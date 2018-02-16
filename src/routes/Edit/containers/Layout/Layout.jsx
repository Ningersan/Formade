import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input } from '../../../../components/index'
import * as formActions from '../../../../actions/formActions'
import * as questionActions from '../../../../actions/questionActions'
import styles from './Layout.scss'

class Layout extends React.Component {
    static propTypes = {
        editing: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,
        children: PropTypes.element.isRequired,
        actions: PropTypes.shape({
            saveTitle: PropTypes.func.isRequired,
            saveForm: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor() {
        super()
        this.state = { isEditing: true }
        this.handleScrollChange = this.handleScrollChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleTabClick = this.handleTabClick.bind(this)
        this.handleSaveForm = this.handleSaveForm.bind(this)
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScrollChange, false)
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScrollChange, false)
    }

    handleTabClick() {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
        }))
    }

    handleTitleChange(e) {
        const { saveTitle } = this.props.actions
        saveTitle(e.target.value, 'form')
    }

    handleScrollChange() {
        const headerbar = this.headerbar
        headerbar.style.height = window.scrollY >= 58 ? '121px' : '176px'
        headerbar.style.position = window.scrollY >= 58 ? 'fixed' : 'absolute'
    }

    handleSaveForm() {
        const { saveForm } = this.props.actions
        console.log(this.props.actions)
        saveForm()
    }

    renderHeader() {
        const { editing } = this.props

        return (
            <div className={styles.header}>
                <div className={styles['header-left']}>
                    <Link
                      to="/"
                      className={styles['backup-link']}
                      onClick={this.handleSaveForm}
                    >
                        <i className="iconfont icon-arrow-left" />
                    </Link>
                    <Input
                      autoSelect
                      className={styles.title}
                      value={editing.title}
                      onChange={this.handleTitleChange}
                    />
                </div>
                <div className={styles['header-right']}>
                    <Link
                      to="/fill"
                      className={styles['fill-link']}
                      onClick={this.handleSaveForm}
                    >
                        <i className="iconfont icon-tianxie" />
                    </Link>
                    <Link to="/" className={styles['home-link']}>
                        <i className="iconfont icon-info" />
                    </Link>
                    <a className={styles.save}>保存</a>
                </div>
            </div>
        )
    }

    renderNavTab() {
        const editorTabClassName = classnames({
            [styles.content]: true,
            [styles.active]: this.state.isEditing,
        })
        const responseTabClassName = classnames({
            [styles.content]: true,
            [styles.active]: !this.state.isEditing,
        })

        return (
            <div className={styles['nav-tab']}>
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
    }

    render() {
        return (
            <div className="layout">
                <div
                  ref={el => this.headerbar = el}
                  className={styles.headerbar}
                  style={{ position: 'absolute' }}
                >
                    {this.renderHeader()}
                    {this.renderNavTab()}
                </div>
                <div className={styles.questionnaire}>{this.props.children}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editing: state.editing,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        saveTitle: questionActions.saveTitle,
        saveForm: formActions.saveForm,
    }, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
