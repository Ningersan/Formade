import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => {
    const { wrapClassName, className, onClick } = props
    return (
        <a
          className={wrapClassName}
          onClick={onClick}
        >
            <i className={className} />
            {props.children}
        </a>
    )
}

Icon.defaultProps = {
    wrapClassName: null,
    onClick: null,
    children: null,
}

Icon.propTypes = {
    wrapClassName: PropTypes.string,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.element,
}

export default Icon
