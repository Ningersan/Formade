import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as questionnaireActions from '../../actions/questionnaire'
import { Table, Dialog, Icon, DropdownMenu } from '../../components/index'
import styles from './Home.scss'

const QuestionnaireTitle = (title, handle) => (
    <Link
      to="/edit"
      role="button"
      className={styles.title}
      onClick={handle}
    >
        <span className={styles['form-icon']}><i className="fa fa-list fa-lg" /></span>
        <span className={styles['title-text']}>{title}</span>
    </Link>
)

const QuestionnaireStatus = state => <div className={styles.state}>{state}</div>

const QuestionnaireDeadline = date => <div className={styles.deadline}>{date}</div>

class Home extends Component {
    static propTypes = {
        questionnaires: PropTypes.array.isRequired,
        addQuestionnaire: PropTypes.func.isRequired,
        editQuestionnaire: PropTypes.func.isRequired,
        renameQuestionnaire: PropTypes.func.isRequired,
        removeQuestionnaire: PropTypes.func.isRequired,
        stopResponse: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.state = { showDialog: false }
        this.handleshowDialog = this.handleshowDialog.bind(this)
    }

    handleshowDialog(flag) {
        this.setState({ showDialog: flag })
    }

    getTableBodyData() {
        const { questionnaires, editQuestionnaire } = this.props

        return questionnaires.map((questionnaire, index) => {
            const { title, status, deadline } = questionnaire
            return [
                QuestionnaireTitle(title, () => editQuestionnaire(index)),
                QuestionnaireStatus(status),
                QuestionnaireDeadline(deadline),
                this.renderDropDownMenu(index),
            ]
        })
    }

    renderAddButton() {
        return (
            <Link
              to="/edit"
              className={styles['add-form-btn']}
              onClick={this.props.addQuestionnaire}
            >
                新建表单
            </Link>
        )
    }

    renderEmptyScreen() {
        return (
            <div className={styles['docs-item-empty']}>
                <h3 className={styles.note}>现在尚无表单呢，不如...</h3>
                {this.renderAddButton()}
            </div>
        )
    }

    renderFormList() {
        const tableData = {
            className: styles['form-list'],
            tableHead: ['表单名称', '状态', '截止日期', '操作'],
            tableBody: this.getTableBodyData(),
            tableHeadStyle: [
                { width: '60%', paddingLeft: '1.5em' },
                { width: '12%', paddingLeft: '0.3em' },
                { width: '22%', paddingLeft: '2.5em' },
                { paddingLeft: '1.5em' },
            ],
            tableBodyStyle: [
                { width: '60%' },
                { width: '12%' },
                { width: '22%', paddingLeft: '1.5em' },
                { paddingLeft: '1.8em' },
            ],
        }

        return <Table data={tableData} />
    }

    renderDialog() {
        const { renameQuestionnaire } = this.props
        return this.state.showDialog &&
            <Dialog
              autoSelectInput
              handleShow={this.handleshowDialog}
              handleSubmit={renameQuestionnaire}
            />
    }

    renderDropDownMenu(index) {
        const { removeQuestionnaire, stopResponse } = this.props

        // toggle resonse button state
        const isStop = this.props.questionnaires[index].stopResponse
        const start = { responseText: '开始回复', responseClassName: 'iconfont icon-start' }
        const stop = { responseText: '停止回复', responseClassName: 'iconfont icon-tingzhi' }
        const { responseText, responseClassName } = isStop ? start : stop

        // set button
        const dropdownButton = (
            <Icon
              wrapClassName={styles['dropdown-button']}
              className={'iconfont icon-ellipsisv'}
            />
        )

        return (
            <DropdownMenu
              wrapClassName={styles.dropdown}
              menuClassName={styles['dropdown-menu']}
              button={dropdownButton}
            >
                <Icon
                  wrapClassName={styles['rename-button']}
                  className={'iconfont icon-aa'}
                  handleClick={() => { this.handleshowDialog(true) }}
                >
                    <span className={styles['icon-text']}>重命名</span>
                </Icon>
                <Icon
                  wrapClassName={styles['delete-button']}
                  className={'iconfont icon-lajitong'}
                  handleClick={() => removeQuestionnaire(index)}
                >
                    <span className={styles['icon-text']}>删除</span>
                </Icon>
                <Icon
                  wrapClassName={styles['release-button']}
                  className={responseClassName}
                  handleClick={() => stopResponse(index)}
                >
                    <span className={styles['icon-text']}>{responseText}</span>
                </Icon>
            </DropdownMenu>
        )
    }

    render() {
        const { questionnaires } = this.props

        return (
            <div className={styles.homescreen}>
                <div className={styles.header}>
                    <div className={styles.recent}>近期表单</div>
                    { questionnaires.length > 0 &&
                        (
                            <div className={styles['menu-bar-right']}>
                                {this.renderAddButton()}
                            </div>
                        )
                    }
                </div>
                <div className={styles['docs-items']}>
                    { questionnaires.length > 0 ? this.renderFormList() : this.renderEmptyScreen() }
                </div>
                {this.renderDialog()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    questionnaires: state.list,
})

const mapDispatchToProps = dispatch => ({
    addQuestionnaire() {
        dispatch(questionnaireActions.addQuestionnaire())
    },
    editQuestionnaire(index) {
        dispatch(questionnaireActions.editQuestionnaire(index))
    },
    renameQuestionnaire(value, index) {
        dispatch(questionnaireActions.renameQuestionnaire(value, index))
    },
    removeQuestionnaire(index) {
        dispatch(questionnaireActions.removeQuestionnaire(index))
    },
    stopResponse(index) {
        dispatch(questionnaireActions.stopResponse(index))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
