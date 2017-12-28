import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => {
    const { wrapClassName, className, handleClick } = props
    return (
        <a
          className={wrapClassName}
          onClick={handleClick}
        >
            <i className={className} />
            {props.children}
        </a>
    )
}

Icon.defaultProps = {
    wrapClassName: null,
    handleClick: null,
    children: null,
}

Icon.propTypes = {
    wrapClassName: PropTypes.string,
    className: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    children: PropTypes.element,
}

export default Icon
