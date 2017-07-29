import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.scss'

function Menu(props) {
    return (
        <div
          className={props.wrapClassName}
          style={props.wrapStyle}
        >
            {props.children.map((item, index) => (
                <div key={index} className={styles['menu-item']}>
                    {item}
                </div>
            ))}
        </div>
    )
}

Menu.propTypes = {
    children: PropTypes.array.isRequired,
    wrapClassName: PropTypes.string.isRequired,
    wrapStyle: PropTypes.object.isRequired,
}


export default Menu
