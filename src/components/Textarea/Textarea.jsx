import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Textarea extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        handleSaveText: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentDidMount() {
        this.textarea.contentEditable = 'true'
    }

    handleBlur(e) {
        this.props.handleSaveText(e.target.textContent)
    }

    render() {
        const { className, placeholder, value, handleSaveText } = this.props
        return (
            <div
              ref={(el) => { this.textarea = el }}
              placeholder={placeholder}
              className={className}
              onBlur={handleSaveText && this.handleBlur}
            >
                {value}
            </div>
        )
    }
}

export default Textarea
