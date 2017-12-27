import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as questionnaireActions from '../../actions/questionnaire'
import { Table, Dialog, DropdownMenu } from '../../components/index'
import styles from './Home.scss'

const titleItem = (title, handle) => (
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

const statusItem = state => <div className={styles.state}>{state}</div>

const deadlineItem = date => <div className={styles.deadline}>{date}</div>

// const icon = () => (
//     <a
//       className={styles['rename-button']}
//       onClick={() => { this.handleshowDialog(true) }}
//     >
//         <i className="iconfont icon-aa" /><span className={styles['icon-text']}>重命名</span>
//     </a>
// )

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

    renderDropDownMenu(index) {
        const { removeQuestionnaire, stopResponse } = this.props

        // toggle resonse button state
        const isStop = this.props.questionnaires[index].stopResponse
        const start = { responseText: '开始回复', responseClassName: 'iconfont icon-start' }
        const stop = { responseText: '停止回复', responseClassName: 'iconfont icon-tingzhi' }
        const { responseText, responseClassName } = isStop ? start : stop

        // set  button
        const dropdownButton = (
            <a className={styles['dropdown-button']}><i className="iconfont icon-ellipsisv" /></a>
        )

        return (
            <DropdownMenu
              wrapClassName={styles.dropdown}
              menuClassName={styles['dropdown-menu']}
              dropdownButton={dropdownButton}
            //   menuStyle={menuStyle}
              buttonRef={this.buttonRef}
            >
                <a
                  className={styles['rename-button']}
                  onClick={() => { this.handleshowDialog(true) }}
                >
                    <i className="iconfont icon-aa" /><span className={styles['icon-text']}>重命名</span>
                </a>
                <a
                  className={styles['delete-button']}
                  onClick={() => removeQuestionnaire(index)}
                >
                    <i className="iconfont icon-lajitong" /><span className={styles['icon-text']}>删除</span>
                </a>
                <a
                  className={styles['release-button']}
                  onClick={() => stopResponse(index)}
                >
                    <i className={responseClassName} /><span className={styles['icon-text']}>{responseText}</span>
                </a>
            </DropdownMenu>
        )
    }

    render() {
        const { questionnaires, editQuestionnaire, renameQuestionnaire } = this.props

        const tableBody = questionnaires.map((questionnaire, index) => {
            const { title, status, deadline } = questionnaire
            return [
                titleItem(title, () => editQuestionnaire(index)),
                statusItem(status),
                deadlineItem(deadline),
                this.renderDropDownMenu(index),
            ]
        })

        const tableData = {
            className: styles['form-list'],
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
            tableHead: ['表单名称', '状态', '截止日期', '操作'],
            tableBody,
        }

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
                    { questionnaires.length > 0 ?
                        <Table
                          data={tableData}
                        />
                    : this.renderEmptyScreen()}
                </div>
                { this.state.showDialog &&
                    <Dialog
                      autoSelectInput
                      handleShow={this.handleshowDialog}
                      handleSubmit={renameQuestionnaire}
                    />
                }
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
