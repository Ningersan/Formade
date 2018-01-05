import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    static defaultProps = {
        id: null,
        type: 'text',
        onChange: null,
        onSaveText: null,
        autoSelect: false,
    }

    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        autoSelect: PropTypes.bool,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onSaveText: PropTypes.func,
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
        this.props.onSaveText(e.target.value, 'question')
    }

    render() {
        const { id, type, autoSelect, className, defaultValue, value,
            onChange, onSaveText,
        } = this.props

        return (
            <input
              id={id}
              type={type}
              className={className}
              ref={(el) => { this.input = el }}
              value={value}
              defaultValue={defaultValue}
              onFocus={autoSelect && this.handleFocus}
              onChange={onChange}
              onBlur={onSaveText && this.handleBlur}
            />
        )
    }
}

export default Input
