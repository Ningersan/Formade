import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Textarea extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onSaveText: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {
        this.input.dataset.content = ''
    }

    handleBlur(e) {
        if (this.input.textContent === '') {
            this.input.dataset.content = this.props.placeholder
        }
        if (this.props.onSaveText) {
            this.props.onSaveText(e.target.textContent)
        }
    }

    render() {
        const { placeholder, className } = this.props
        return (
            <div
              contentEditable="true"
              data-content={placeholder}
              className={className}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={(input) => { this.input = input }}
            />
        )
    }
}

export default Textarea
