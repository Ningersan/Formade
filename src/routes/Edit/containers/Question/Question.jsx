import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Input, DropdownMenu } from '../../../../components/index'
import styles from './Question.scss'

class Question extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        hasOther: PropTypes.bool.isRequired,
        options: PropTypes.array.isRequired,
        handleDragStart: PropTypes.func.isRequired,
        handleDragEnter: PropTypes.func.isRequired,
        handleSaveTitle: PropTypes.func.isRequired,
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

    constructor() {
        super()
        this.state = { isActive: false }
        this.handleClick = this.handleClick.bind(this)
        this.renderOption = this.renderOption.bind(this)
        this.renderTypeChooser = this.renderTypeChooser.bind(this)
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    getInputClassName() {
        return { radio: styles['symbol-radio'], checkbox: styles['symbol-checkbox'] }[this.props.type]
    }

    handleClick(e) {
        if (this.mainEle) {
            this.setState({
                isActive: this.mainEle.contains(e.target),
            })
        }
    }

    renderOther() {
        return (
            <div className={styles.item}>
                <div className={this.getInputClassName()} />
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
                <div className={this.getInputClassName()} />
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
        const { type, handleSetQuestionType } = this.props
        const { curType, curTypeClassName } = {
            radio: {
                curType: '单选题',
                curTypeClassName: 'iconfont icon-radiobutton',
            },
            checkbox: {
                curType: '多选题',
                curTypeClassName: 'iconfont icon-check-box',
            },
            text: {
                curType: '文本',
                curTypeClassName: 'iconfont icon-text',
            },
        }[type]

        const button = (
            <div className={styles.type}>
                <i className={curTypeClassName} />
                <span className={styles.content}>{curType}</span>
                <i className="fa fa-lg fa-caret-down" />
            </div>
        )

        const menuStyle = { top: '-1em' }

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
                  onClick={() => handleSetQuestionType('radio')}
                >
                    <a className={styles['radio-button']}><i className="iconfont icon-radiobutton" /></a>
                    <span className={styles.content}>单选题</span>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['type-item']}
                  onClick={() => handleSetQuestionType('checkbox')}
                >
                    <a className={styles['checkbox-button']}><i className="iconfont icon-check-box" /></a>
                    <span className={styles.content}>多选题</span>
                </div>
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['type-item']}
                  onClick={() => handleSetQuestionType('text')}
                >
                    <a className={styles['text-button']}><i className="iconfont icon-text" /></a>
                    <span className={styles.content}>文本</span>
                </div>
            </DropdownMenu>
        )
    }

    render() {
        const { offsetY, handleDrag, handleDragStart, handleDragEnter,
            handleAddOption, handleAddOther, handleSaveTitle,
            handleCopyQuestion, handleRemoveQuestion, handleToggleQuestion,
        } = this.props
        const questionClassName = classnames({
            [styles.main]: true,
            [styles['edit-active']]: this.state.isActive,
        })
        const options = this.props.options.map(this.renderOption)
        const addOptions = (
            <div className={styles.add}>
                <div className={this.getInputClassName()} />
                <span
                  role="button"
                  tabIndex="0"
                  className={styles['add-option']}
                  onClick={handleAddOption}
                >添加选项</span>
                <span className={styles.conjunction}>或</span>
                <span
                  role="button"
                  tabIndex="0"
                  className={styles['add-option']}
                  onClick={handleAddOther}
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

        const questionStyle = {
            transform: `translateY(${offsetY}px)`,
        }

        return (
            <div
              role="button"
              tabIndex="-1"
              draggable="true"
              ref={el => (this.mainEle = el)}
              className={questionClassName}
              style={questionStyle}
              onDrag={handleDrag}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDrop={this.handleDrop}
            >
                <div className={styles['drag-handle']}>
                    <a className={styles['drag-icon']}><i className="iconfont icon-drag" /></a>
                </div>
                <Input
                  className={styles.title}
                  defaultValue={this.props.title}
                  saveTitle={handleSaveTitle}
                />
                {this.renderTypeChooser()}
                {this.props.type === 'text' ? textArea : optionArea}
                <div className={styles.control}>
                    <div className={styles['footer-right']}>
                        <div
                          role="button"
                          tabIndex="0"
                          className={styles['copy-question']}
                          onClick={handleCopyQuestion}
                        >
                            <a className={styles['copy-icon']}><i className="iconfont icon-copydownlink" /></a>
                        </div>
                        <div
                          role="button"
                          tabIndex="0"
                          className={styles['delete-question']}
                          onClick={handleRemoveQuestion}
                        >
                            <a className={styles['delete-icon']}><i className="iconfont icon-delete" /></a>
                        </div>
                        <div className={styles['required-toggle']}>
                            <label>
                                <input
                                  type="checkbox"
                                  className={styles.required}
                                  onChange={handleToggleQuestion}
                                />
                                必填
                            </label>
                        </div>
                        <div className={styles.more}>
                            <a className={styles['more-icon']}><i className="iconfont icon-ellipsis-v" /></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question
