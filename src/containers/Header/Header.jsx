import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.scss'

function Header(props) {
    return (
        <div className={styles['app-bar']}>
            <button className="iconfont icon-menu" onClick={props.onClick} ref={props.btnRef} />
            <h1 className={styles.title}>Formade</h1>
        </div>
    )
}

Header.propTypes = {
    onClick: PropTypes.func.isRequired,
    btnRef: PropTypes.func.isRequired,
}

export default Header
