import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    static defaultProps = {
        type: 'text',
        autoSelect: false,
    }

    static propTypes = {
        type: PropTypes.string,
        autoSelect: PropTypes.bool,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        handleChange: PropTypes.func,
        handleSaveText: PropTypes.func,
        className: PropTypes.string.isRequired,
    }

    constructor() {
        super()
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {
        this.input.select()
    }

    handleBlur(e) {
        this.props.handleSaveText(e.target.value, 'question')
    }

    render() {
        const { type, autoSelect, className, defaultValue, value,
            handleChange, handleSaveText,
        } = this.props

        return (
            <input
              type={type}
              className={className}
              ref={(el) => { this.input = el }}
              value={value}
              defaultValue={defaultValue}
              onFocus={autoSelect && this.handleFocus}
              onChange={handleChange}
              onBlur={handleSaveText && this.handleBlur}
            />
        )
    }
}

export default Input
