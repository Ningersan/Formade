import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Textarea.scss'

class Textarea extends Component {
    static defaultProps = {
        value: null,
    }

    static propTypes = {
        value: PropTypes.string,
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
        const classNames = classnames({
            [styles.textarea]: true,
            [className]: className && true,
        })

        return (
            <div
              ref={(el) => { this.textarea = el }}
              placeholder={placeholder}
              className={classNames}
              onBlur={handleSaveText && this.handleBlur}
            >
                {value}
            </div>
        )
    }
}

export default Textarea
