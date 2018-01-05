import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Textarea.scss'

class Textarea extends Component {
    static defaultProps = {
        value: null,
        onSaveText: null,
    }

    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onSaveText: PropTypes.func,
    }

    constructor() {
        super()
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentDidMount() {
        this.textarea.contentEditable = 'true'
    }

    handleBlur(e) {
        this.props.onSaveText(e.target.textContent)
    }

    render() {
        const { className, placeholder, value, onSaveText } = this.props
        const classNames = classnames({
            [styles.textarea]: true,
            [className]: className && true,
        })

        return (
            <div
              ref={(el) => { this.textarea = el }}
              placeholder={placeholder}
              className={classNames}
              onBlur={onSaveText && this.handleBlur}
            >
                {value}
            </div>
        )
    }
}

export default Textarea
