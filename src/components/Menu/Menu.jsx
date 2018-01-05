import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Menu.scss'

const Menu = (props) => {
    const { wrapClassName, wrapStyle, children, itemClassName } = props
    const wrapClasses = classnames({
        [styles.wrap]: true,
        [wrapClassName]: wrapClassName && true,
    })

    return (
        <ul
          className={wrapClasses}
          style={wrapStyle}
        >
            {React.Children.map(children, (item, index) =>
                <li key={index} className={itemClassName}>{item}</li>
            )}
        </ul>
    )
}

Menu.defaultProps = {
    itemClassName: null,
    wrapStyle: null,
}

Menu.propTypes = {
    wrapClassName: PropTypes.string.isRequired,
    itemClassName: PropTypes.string,
    wrapStyle: PropTypes.object,
    children: PropTypes.array.isRequired,
}

export default Menu
