import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../../components/Input/Input'
import styles from './Question.scss'

class Question extends React.Component {
    constructor() {
        super()
        this.state = {
            hasOther: false,
            isActive: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleaddOther = this.handleaddOther.bind(this)
        this.handleDeleteOther = this.handleDeleteOther.bind(this)
        this.renderOption = this.renderOption.bind(this)
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    getSymbolClassNameByType() {
        return this.props.type === 'radio' ? styles['symbol-radio'] : styles['symbol-checkbox']
    }

    componentWillUnMount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    handleClick(e) {
        let isActive = null

        if (this.mainEle.contains(e.target)) {
            isActive = true
        } else {
            isActive = false
        }

        this.setState({
            isActive,
        })
    }

    handleaddOther() {
        this.setState({
            hasOther: true,
        })
    }

    handleDeleteOther() {
        this.setState({
            hasOther: false,
        })
    }

    renderOther() {
        return (
            <div className={styles.list}>
                <div className={this.getSymbolClassNameByType()} />
                <input type="text" className={styles.other} defaultValue="其他" disabled />
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['delete-option']}
                  onClick={this.handleDeleteOther}
                />
            </div>
        )
    }

    renderOption(option, index) {
        return (
            <div className={styles.list} key={index}>
                <div className={this.getSymbolClassNameByType()} />
                <Input
                  className={styles.option}
                  value={option}
                  onChange={this.props.handleOptionChange(index)}
                />
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['delete-option']}
                  onClick={() => this.props.handleDeleteOption(index)}
                />
            </div>
        )
    }

    render() {
        const questionClassName = this.state.isActive ? `${styles.main} ${styles['edit-active']}` : styles.main
        const options = this.props.options.map(this.renderOption)
        const addOptions = (
            <div className={styles.add}>
                <div className={this.getSymbolClassNameByType()} />
                <span
                  role="button"
                  tabIndex="0"
                  className={styles['add-option']}
                  onClick={this.props.handleAddOption}
                >添加选项</span>
                <span className={styles.conjunction}>或</span>
                <span
                  role="button"
                  tabIndex="0"
                  className={styles['add-option']}
                  onClick={this.handleaddOther}
                >添加其他</span>
            </div>
        )

        return (
            <div
              role="button"
              tabIndex="-1"
              ref={el => (this.mainEle = el)}
              className={questionClassName}
            >
                <Input className={styles.title} defaultValue="未命名的问题" />
                {options}
                {this.state.hasOther && this.renderOther()}
                {addOptions}
                <div className={styles.control}>
                    <div className={styles['footer-right']}>
                        <div
                          role="button"
                          tabIndex="0"
                          className={styles['copy-question']}
                          onClick={this.props.handleCopyQuestion}
                        >
                            <i className="fa fa-clone" />
                        </div>
                        <div
                          role="button"
                          tabIndex="0"
                          className={styles['delete-question']}
                          onClick={this.props.handleDeleteQuestion}
                        >
                            <i className="fa fa-trash-o" />
                        </div>
                        <label>
                            <span>必填</span>
                            <i className="fa fa-check" />
                        </label>
                        <div>
                            <i className="fa fa-ellipsis-v" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    options: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    handleAddOption: PropTypes.func.isRequired,
    handleDeleteOption: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
    handleCopyQuestion: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired,
}

export default Question
