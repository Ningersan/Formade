import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Textarea extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        handleSaveText: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {
        if (this.props.placeholder === '表单说明') {
            this.input.dataset.content = ''
        }
    }

    handleBlur(e) {
        if (this.input.textContent === '') {
            this.input.dataset.content = '表单说明'
        }
        if (this.props.handleSaveText) {
            this.props.handleSaveText(e.target.textContent)
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
              ref={(el) => { this.input = el }}
            />
        )
    }
}

export default Textarea
