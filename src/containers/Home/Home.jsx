import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as questionnaireActions from '../../actions/questionnaire'
import Table from '../../components/Table/Table'
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'
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

const statusItem = state => (<div className={styles.state}>{state}</div>)

const deadlineItem = date => <div className={styles.deadline}>{date}</div>

const creatFormButton = handleFunc => (
    <Link
      to="/edit"
      className={styles['creat-form-btn']}
      onClick={handleFunc}
    >
    新建表单
    </Link>
)

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
    removeQuestionnaire(index) {
        dispatch(questionnaireActions.removeQuestionnaire(index))
    },
})

class HomeScreen extends React.Component {
    renderEmptyScreen() {
        return (
            <div className={styles['docs-item-empty']}>
                <h3 className={styles.note}>现在尚无表单呢，不如...</h3>
                {creatFormButton(this.props.addQuestionnaire)}
            </div>
        )
    }

    renderDropDownMenu(index) {
        const menuStyle = {
            marginLeft: '-6em',
        }
        const dropdownButton = (
            <a className={styles['dropdown-button']}><i className="fa fa-ellipsis-v fa-lg" /></a>
        )

        return (
            <DropdownMenu
              wrapClassName={styles['dropdown-menu']}
              dropdownButton={dropdownButton}
              menuStyle={menuStyle}
              buttonRef={this.buttonRef}
            >
                <a
                  className={styles['rename-button']}
                >
                    <i className="fa fa-eraser fa-lg" /><span>重命名</span>
                </a>
                <a
                  className={styles['delete-button']}
                  onClick={() => this.props.removeQuestionnaire(index)}
                >
                    <i className="fa fa-trash fa-lg" /><span>删除</span>
                </a>
                <a
                  className={styles['release-button']}
                >
                    <i className="fa fa-share-alt fa-lg" /><span>发布</span>
                </a>
            </DropdownMenu>
        )
    }

    render() {
        const tableBody = this.props.questionnaires.map((questionnaire, index) => {
            const { title, status, deadline } = questionnaire
            return [
                titleItem(title, () => this.props.editQuestionnaire(index)),
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

        const { questionnaires, addQuestionnaire } = this.props

        return (
            <div className={styles.homescreen}>
                <div className={styles.header}>
                    <div className={styles.recent}>近期表单</div>
                    { questionnaires.length !== 0 &&
                        (
                            <div className={styles['menu-bar-right']}>
                                {creatFormButton(addQuestionnaire)}
                            </div>
                        )
                    }
                </div>
                <div className={styles['docs-items']}>
                    {questionnaires.length !== 0 ?
                        <Table
                          data={tableData}
                        />
                    : this.renderEmptyScreen()}
                </div>
            </div>
        )
    }
}

HomeScreen.propTypes = {
    questionnaires: PropTypes.array.isRequired,
    addQuestionnaire: PropTypes.func.isRequired,
    editQuestionnaire: PropTypes.func.isRequired,
    removeQuestionnaire: PropTypes.func.isRequired,
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

export default Home
