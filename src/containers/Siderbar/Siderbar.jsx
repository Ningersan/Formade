import React from 'react'
import styles from './Siderbar.scss'

function Siderbar(props) {
    return (
        <div className={styles['sider-bar']} ref={props.navRef} key={'siderbar'} >
            <div className={styles.logo}>Google Forms</div>
            <ul className={styles.menu}>
                <li className={styles['menu-item']}><a><i className="fa fa-user fa-lg fa-fw" /><span className={styles['menu-item-text']}>登录</span></a></li>
                <li className={styles['menu-item']}><a><i className="fa fa-cloud fa-lg fa-fw" /><span className={styles['menu-item-text']}>备份</span></a></li>
            </ul>
        </div>
    )
}

export default Siderbar
