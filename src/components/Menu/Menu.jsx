import React from 'react'
import PropTypes from 'prop-types'

function Menu(props) {
    const { wrapClassName, wrapStyle, children, itemClassName } = props
    return (
        <div
          className={wrapClassName}
          style={wrapStyle}
        >
            {
                React.Children.map(children, (item, index) =>
                    <div key={index} className={itemClassName}>{item}</div>
                )
            }
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
