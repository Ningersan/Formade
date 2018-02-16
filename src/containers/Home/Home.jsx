import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as formActions from '../../actions/formActions'
import { Table, Dialog, Icon, DropdownMenu } from '../../components/index'
import styles from './Home.scss'

const FormTitle = (title, handle) => (
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

const FormStatus = state => <div className={styles.state}>{state}</div>

const FormDeadline = date => <div className={styles.deadline}>{date}</div>

class Home extends Component {
    static propTypes = {
        forms: PropTypes.object.isRequired,
        formIds: PropTypes.array.isRequired,
        actions: PropTypes.shape({
            addForm: PropTypes.func.isRequired,
            editForm: PropTypes.func.isRequired,
            renameForm: PropTypes.func.isRequired,
            removeForm: PropTypes.func.isRequired,
            stopResponse: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor() {
        super()
        this.state = {
            isDialogOpen: false,
            renameId: null,
        }
        this.handleAddForm = this.handleAddForm.bind(this)
        this.handleEditForm = this.handleEditForm.bind(this)
        this.handleRenameForm = this.handleRenameForm.bind(this)
        this.handleRemoveForm = this.handleRemoveForm.bind(this)
        this.handleStopResponse = this.handleStopResponse.bind(this)
        this.handleToggleDialog = this.handleToggleDialog.bind(this)
    }

    handleToggleDialog(flag, formId) {
        this.setState({
            isDialogOpen: flag,
            renameId: formId,
        })
    }

    handleAddForm() {
        const { addForm } = this.props.actions
        addForm()
    }

    handleEditForm(index) {
        const { editForm } = this.props.actions
        editForm(index)
    }

    handleRenameForm(index) {
        return (value) => {
            const { renameForm } = this.props.actions
            renameForm(value, index)
        }
    }

    handleRemoveForm(index) {
        const { removeForm } = this.props.actions
        removeForm(index)
    }

    handleStopResponse(index) {
        const { stopResponse } = this.props.actions
        stopResponse(index)
    }

    getTableBodyData() {
        const { forms, formIds } = this.props

        return formIds.map((id) => {
            const { title, status, deadline } = forms[id]
            return [
                FormTitle(title, () => this.handleEditForm(id)),
                FormStatus(status),
                FormDeadline(deadline),
                this.renderDropDownMenu(id),
            ]
        })
    }

    getTableData() {
        return {
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
    }

    renderAddButton() {
        return (
            <Link
              to="/edit"
              className={styles['add-form-btn']}
              onClick={this.handleAddForm}
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
        return <Table data={this.getTableData()} />
    }

    renderDialog() {
        const { forms } = this.props
        const { renameId } = this.state
        return (
            <Dialog
              autoSelectInput
              defaultValue={forms[renameId].title}
              onShow={this.handleToggleDialog}
              onSubmit={this.handleRenameForm(renameId)}
            />
        )
    }

    renderDropDownMenu(id) {
        // toggle resonse button state
        // focus here
        const isStop = this.props.forms[id].stopResponse
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
              toggle={dropdownButton}
            >
                <Icon
                  wrapClassName={styles['rename-button']}
                  className={'iconfont icon-aa'}
                  onClick={() => { this.handleToggleDialog(true, id) }}
                >
                    <span className={styles['icon-text']}>重命名</span>
                </Icon>
                <Icon
                  wrapClassName={styles['delete-button']}
                  className={'iconfont icon-lajitong'}
                  onClick={() => this.handleRemoveForm(id)}
                >
                    <span className={styles['icon-text']}>删除</span>
                </Icon>
                <Icon
                  wrapClassName={styles['release-button']}
                  className={responseClassName}
                  onClick={() => this.handleStopResponse(id)}
                >
                    <span className={styles['icon-text']}>{responseText}</span>
                </Icon>
            </DropdownMenu>
        )
    }

    render() {
        const { isDialogOpen } = this.state
        const { formIds } = this.props

        return (
            <div className={styles.homescreen}>
                <div className={styles.header}>
                    <div className={styles.recent}>近期表单</div>
                    {formIds.length > 0 &&
                        <div className={styles['menu-bar-right']}>
                            {this.renderAddButton()}
                        </div>
                    }
                </div>
                <div className={styles['docs-items']}>
                    {formIds.length > 0 ? this.renderFormList() : this.renderEmptyScreen() }
                </div>
                {isDialogOpen && this.renderDialog()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    forms: state.forms.byId,
    formIds: state.forms.allIds,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        addForm: formActions.addForm,
        editForm: formActions.editForm,
        renameForm: formActions.renameForm,
        removeForm: formActions.removeForm,
        stopResponse: formActions.stopResponse,
    }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
