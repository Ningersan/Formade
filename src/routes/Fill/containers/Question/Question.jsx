import React from 'react'
import PropTypes from 'prop-types'
import Textarea from '../../../../components/Textarea/Textarea'
import styles from './Question.scss'

class Question extends React.Component {
    constructor() {
        super()
        this.renderOption = this.renderOption.bind(this)
    }

    getSymbolClassName() {
        return this.props.type === 'radio' ? styles['radio-icon'] : styles['checkbox-icon']
    }

    renderOption(option, index) {
        const { type, title, handleChooseOption } = this.props
        return (
            <label
              key={index}
              className={styles['option-item-wrap']}
            >
                <div className={styles['label-wrap']}>
                    <input
                      type={type}
                      name={title}
                      className={styles.toggle}
                      onChange={() => handleChooseOption(index, type)}
                    />
                    <span className={this.getSymbolClassName()} />
                    <span className={styles['option-text']}>{option}</span>
                </div>
            </label>
        )
    }

    render() {
        const options = this.props.options.map(this.renderOption)
        const text = (
            <Textarea
              className={styles.textarea}
              placeholder="您的回答"
              onSaveText={this.props.handleSaveText}
            />
        )
        return (
            <div className={styles.question}>
                <div className={styles.title}>{this.props.title}</div>
                <div className={styles['option-list']}>
                    {this.props.type === 'text' ? text : options}
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    handleChooseOption: PropTypes.func.isRequired,
    handleSaveText: PropTypes.func.isRequired,
}

export default Question
