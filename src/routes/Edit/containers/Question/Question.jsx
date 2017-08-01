import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../../components/Input/Input'
import DropdownMenu from '../../../../components/DropdownMenu/DropdownMenu'
import styles from './Question.scss'

class Question extends React.Component {
    constructor() {
        super()
        this.state = {
            isActive: false,
            showTypeMenu: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.renderOption = this.renderOption.bind(this)
        this.renderTypeChooser = this.renderTypeChooser.bind(this)
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
        if (this.mainEle) {
            const isActive = this.mainEle.contains(e.target)
            this.setState({
                isActive,
            })
        }
    }

    renderOther() {
        return (
            <div className={styles.item}>
                <div className={this.getSymbolClassNameByType()} />
                <input
                  type="text"
                  className={styles.other}
                  defaultValue="其他"
                  disabled
                />
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['delete-option']}
                  onClick={this.props.handleRemoveOther}
                />
            </div>
        )
    }

    renderOption(option, index) {
        return (
            <div className={styles.item} key={index}>
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
                  onClick={() => this.props.handleRemoveOption(index)}
                />
            </div>
        )
    }

    renderTypeChooser() {
        const { type } = this.props
        let [curType, curTypeClassName] = [null, null]
        if (type === 'radio') {
            curType = '单选题'
            curTypeClassName = 'fa fa-lg fa-circle-o'
        } else if (type === 'checkbox') {
            curType = '多选题'
            curTypeClassName = 'fa fa-lg fa-check-square'
        } else {
            curType = '文本'
            curTypeClassName = 'fa fa-lg fa-check-square'
        }
        const button = (
            <div className={styles.type}>
                <i className={curTypeClassName} />
                <span className={styles.content}>{curType}</span>
                <i className="fa fa-lg fa-caret-down" />
            </div>
        )
        const menuStyle = {
            top: '-1em',
        }
        return (
            <DropdownMenu
              wrapClassName={styles['type-chooser']}
              menuStyle={menuStyle}
              dropdownButton={button}
            >
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['type-item']}
                  onClick={() => this.props.handleSetQuestionType('radio')}
                >
                    <i className="fa fa-circle-o fa-lg" />
                    <span className={styles.content}>单选题</span>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['type-item']}
                  onClick={() => this.props.handleSetQuestionType('checkbox')}
                >
                    <i className="fa fa-check-square fa-lg" />
                    <span className={styles.content}>多选题</span>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['type-item']}
                  onClick={() => this.props.handleSetQuestionType('text')}
                >
                    <i className="fa fa-pencil-square-o fa-lg fa-fw" />
                    <span className={styles.content}>文本</span>
                </div>
            </DropdownMenu>
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
                  onClick={this.props.handleAddOther}
                >添加其他</span>
            </div>
        )
        const optionArea = (
            <div>
                {options}
                {this.props.hasOther && this.renderOther()}
                {addOptions}
            </div>
        )
        const textArea = (
            <div className={styles.textarea}>
                <input
                  type="text"
                  className={styles.text}
                  defaultValue="文本"
                  disabled
                />
            </div>
        )

        return (
            <div
              role="button"
              tabIndex="-1"
              ref={el => (this.mainEle = el)}
              className={questionClassName}
            >
                <Input
                  className={styles.title}
                  defaultValue={this.props.title}
                  onBlur={this.props.handleSaveTitle}
                />
                {this.renderTypeChooser()}
                {this.props.type === 'text' ? textArea : optionArea}
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
                          onClick={this.props.handleRemoveQuestion}
                        >
                            <i className="fa fa-trash-o" />
                        </div>
                        <div className={styles['required-toggle']}>
                            <label>
                                <input
                                  type="checkbox"
                                  className={styles.required}
                                  onChange={this.props.handleToggleQuestion}
                                />
                                必填
                            </label>
                        </div>
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
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hasOther: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired,
    handleAddOption: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
    handleRemoveOption: PropTypes.func.isRequired,
    handleCopyQuestion: PropTypes.func.isRequired,
    handleSetQuestionType: PropTypes.func.isRequired,
    handleToggleQuestion: PropTypes.func.isRequired,
    handleRemoveQuestion: PropTypes.func.isRequired,
    handleAddOther: PropTypes.func.isRequired,
    handleRemoveOther: PropTypes.func.isRequired,
}

export default Question
