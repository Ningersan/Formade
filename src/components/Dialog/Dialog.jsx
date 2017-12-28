import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Dialog.scss'

class Dialog extends Component {
    static defaultProps = {
        autoSelectInput: true,
        handleSubmit: null,
    }

    static propTypes = {
        autoSelectInput: PropTypes.bool.isRequired,
        handleShow: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func,
    }

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    componentDidMount() {
        if (this.props.autoSelectInput) {
            this.input.select()
        }
    }

    close() {
        this.props.handleShow(false)
    }

    handleClick() {
        this.close()
    }

    handleConfirm() {
        if (this.props.handleSubmit) {
            const value = this.input.value
            this.props.handleSubmit(value, 0)
        }
        this.close()
    }

    render() {
        return (
            <div className={styles['dialog-mask']}>
                <div className={styles.dialog}>
                    <div
                      className={styles['dialog-header']}
                    >
                        <span className={styles.rename}>重命名</span>
                        <span
                          role="button"
                          tabIndex="0"
                          className={styles.close}
                          onClick={this.handleClick}
                        >x</span>
                    </div>
                    <label
                      htmlFor={styles['user-input']}
                      className={styles['dialog-remainder']}
                    >请为其输入新的名称</label>
                    <input
                      type="text"
                      id={styles['user-input']}
                      defaultValue="未命名的表单"
                      ref={(el) => { this.input = el }}
                    />
                    <div className={styles['dialog-button-wrap']}>
                        <button className={styles['confirm-button']} onClick={this.handleConfirm}>确定</button>
                        <button className={styles['cancel-button']} onClick={this.handleClick}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialog
