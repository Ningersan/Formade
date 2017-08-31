import React from 'react'
import PropTypes from 'prop-types'
import styles from './Dialog.scss'

class Dialog extends React.Component {
    constructor() {
        super()
        this.state = {
            isDraging: false,
        }
        this.handleConfirm = this.handleConfirm.bind(this)
    }
    componentDidMount() {
        this.input.select()
    }
    handleConfirm() {
        const value = this.input.value
        this.props.renameQuestionnaire(value, 0)
        this.props.showDialog(false)
    }
    render() {
        return (
            <div className={styles['dialog-mask']}>
                <div className={styles.dialog}>
                    <div
                        className={styles['dialog-header']}
                    >
                        <span className={styles.rename}>重命名</span>
                        <span className={styles.close} onClick={() => { this.props.showDialog(false) }}>x</span>
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
                    <div className={styles['dialog-button-field']}>
                        <button className={styles.confirm} onClick={this.handleConfirm}>确定</button>
                        <button className={styles.cancel} onClick={() => { this.props.showDialog(false) }}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialog
