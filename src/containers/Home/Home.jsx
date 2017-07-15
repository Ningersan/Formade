import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.scss'

function Home() {
    return (
        <div className={styles.homescreen}>
            <div className={styles.header}>
                <div>近期表单</div>
            </div>
            <div className={styles['docs-item-empty']}>
                <h3 className={styles.note}>尚无表单</h3>
                <button className={styles.add}><Link to="/edit">新建表单</Link></button>
            </div>
        </div>
    )
}

export default Home
