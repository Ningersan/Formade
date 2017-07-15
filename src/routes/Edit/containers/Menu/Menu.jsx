import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.scss'

function Menu(props) {
    return (
        <div className={styles['items-wrap']}>
            <div
              role="button"
              tabIndex="0"
              title="添加单选"
              className={styles['add-question']}
              onClick={() => props.handleAddQuestion('radio')}
            >
                <i className="fa fa-lg fa-circle-o" />
            </div>
            <div
              role="button"
              tabIndex="0"
              title="添加多选"
              className={styles['add-question']}
              onClick={() => props.handleAddQuestion('checkbox')}
            >
                <i className="fa fa-lg fa-check-square" />
            </div>
        </div>
    )
}

Menu.propTypes = {
    handleAddQuestion: PropTypes.func.isRequired,
}

export default Menu
