import React from 'react'
import PropTypes from 'prop-types'
import styles from './Siderbar.scss'

function Siderbar(props) {
    return (
        <div className={styles['sider-bar']} ref={props.navRef} key={'siderbar'} >
            <div className={styles.logo}>Formade 表单</div>
            <ul className={styles.menu}>
                <li className={styles['menu-item']}><a><i className="fa fa-user fa-lg fa-fw" /><span className={styles['menu-item-text']}>登录</span></a></li>
                <li className={styles['menu-item']}><a><i className="fa fa-cloud fa-lg fa-fw" /><span className={styles['menu-item-text']}>备份</span></a></li>
            </ul>
        </div>
    )
}

Siderbar.propTypes = {
    navRef: PropTypes.func.isRequired,
}

export default Siderbar
