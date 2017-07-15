import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
    constructor() {
        super()
        this.handleFocus = this.handleFocus.bind(this)
    }

    handleFocus() {
        this.input.select()
    }

    render() {
        const { className, defaultValue, value, onChange } = this.props
        return (
            <input
              type="text"
              className={className}
              ref={(input) => { this.input = input }}
              defaultValue={defaultValue}
              value={value}
              onFocus={this.handleFocus}
              onChange={onChange}
            />
        )
    }
}

Input.propTypes = {
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input
