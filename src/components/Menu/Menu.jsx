import React from 'react'
import PropTypes from 'prop-types'

function Menu(props) {
    return (
        <div
          className={props.wrapClassName}
          style={props.wrapStyle}
        >
            {props.children.map((item, index) => (
                <div key={index} className={props.itemClassName}>
                    {item}
                </div>
            ))}
        </div>
    )
}

Menu.propTypes = {
    children: PropTypes.array.isRequired,
    wrapClassName: PropTypes.string.isRequired,
    itemClassName: PropTypes.string,
    wrapStyle: PropTypes.object,
}

export default Menu
