import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table/Table'
import styles from './Home.scss'

const newForm = (
    <div className={styles['docs-item-empty']}>
        <h3 className={styles.note}>尚无表单</h3>
        <button className={styles.add}><Link to="/edit">新建表单</Link></button>
    </div>
)

const titleItem = title => (
    <div>
        <a className={styles['form-icon']}><i className="fa fa-list fa-lg" /></a>
        <span className={styles['form-title']}>{title}</span>
    </div>
)

const stateItem = state => (<div className={styles.state}>{state}</div>)

const deadlineItem = date => <div className={styles.deadline}>{date}</div>

const moreItem = (
    <a className={styles.more}><i className="fa fa-ellipsis-v fa-lg" /></a>
)

function Home() {
    const tableData = {
        className: styles['form-list'],
        tableHeadStyle: [
            { width: '50%', paddingLeft: '1.5em' },
            { width: '22%', paddingLeft: '5.3em' },
            { width: '22%', paddingLeft: '2.5em' },
            { paddingLeft: '1.5em' },
        ],
        tableBodyStyle: [
            { width: '50%' },
            { width: '22%', paddingLeft: '5em' },
            { width: '22%', paddingLeft: '1.5em' },
            { paddingLeft: '1.8em' },
        ],
        tableHead: ['表单名称', '状态', '截止日期', '操作'],
        tableBody: [
            [titleItem('未命名的表单'), stateItem('未发布'), deadlineItem('2017年7月25日'), moreItem],
            [titleItem('未命名的表单'), stateItem('未发布'), deadlineItem('2017年7月25日'), moreItem],
        ],
    }

    return (
        <div className={styles.homescreen}>
            <div className={styles.header}>
                <div>近期表单</div>
            </div>
            <div className={styles['docs-items']}>
                {newForm}
            </div>
        </div>
    )
}

export default Home
