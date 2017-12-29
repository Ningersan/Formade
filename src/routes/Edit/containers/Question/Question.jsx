import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Input, Icon, DropdownMenu } from '../../../../components/index'
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
        this.renderTypeMenu = this.renderTypeMenu.bind(this)
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
        const { handleOptionChange, handleRemoveOption } = this.props
        return (
            <div className={styles.item} key={index}>
                <div className={this.getInputClassName()} />
                <Input
                  autoSelect
                  className={styles.option}
                  value={option}
                  handleChange={handleOptionChange(index)}
                />
                <div
                  role="button"
                  tabIndex="0"
                  className={styles['delete-option']}
                  onClick={() => handleRemoveOption(index)}
                />
            </div>
        )
    }

    renderOptionArea() {
        const { handleAddOption, handleAddOther } = this.props
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

        return (
            <div className="option-list">
                {options}
                {this.props.hasOther && this.renderOther()}
                {addOptions}
            </div>
        )
    }

    renderTextArea() {
        return (
            <div className={styles.textarea}>
                <input
                  type="text"
                  className={styles.text}
                  defaultValue="文本"
                  disabled
                />
            </div>
        )
    }

    renderTypeMenu() {
        const { type, handleSetQuestionType } = this.props
        const { selectedType, selectedClassName } = {
            radio: { selectedType: '单选题', selectedClassName: 'iconfont icon-radiobutton' },
            checkbox: { selectedType: '多选题', selectedClassName: 'iconfont icon-check-box' },
            text: { selectedType: '文本', selectedClassName: 'iconfont icon-text' },
        }[type]

        const dropdownButton = (
            <Icon
              wrapClassName={styles.type}
              className={selectedClassName}
            >
                <span className={styles.content}>{selectedType}</span>
            </Icon>
        )

        return (
            <DropdownMenu
              wrapClassName={styles['type-chooser']}
              toggle={dropdownButton}
            >
                <Icon
                  wrapClassName={styles['type-item']}
                  className={'iconfont icon-radiobutton'}
                  handleClick={() => handleSetQuestionType('radio')}
                >
                    <span className={styles.content}>单选题</span>
                </Icon>
                <Icon
                  wrapClassName={styles['type-item']}
                  className={'iconfont icon-check-box'}
                  handleClick={() => handleSetQuestionType('checkbox')}
                >
                    <span className={styles.content}>单选题</span>
                </Icon>
                <Icon
                  wrapClassName={styles['type-item']}
                  className={'iconfont icon-text'}
                  handleClick={() => handleSetQuestionType('text')}
                >
                    <span className={styles.content}>单选题</span>
                </Icon>
            </DropdownMenu>
        )
    }

    renderActions() {
        const { handleCopyQuestion, handleRemoveQuestion, handleToggleQuestion } = this.props
        return (
            <div className={styles.control}>
                <div className={styles['footer-right']}>
                    <Icon
                      wrapClassName={styles['copy-question']}
                      className={'iconfont icon-copydownlink'}
                      handleClick={handleCopyQuestion}
                    />
                    <Icon
                      wrapClassName={styles['delete-question']}
                      className={'iconfont icon-delete'}
                      handleClick={handleRemoveQuestion}
                    />
                    <label name="require" className={styles['required-toggle']}>
                        <Input
                          type="checkbox"
                          className={styles.required}
                          onChange={handleToggleQuestion}
                        />
                        <span>必填</span>
                    </label>
                    <Icon
                      wrapClassName={styles['show-more-button']}
                      className={'iconfont icon-ellipsis-v'}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { type, handleDragStart, handleDragEnter, handleSaveTitle } = this.props
        const questionClassName = classnames({
            [styles.main]: true,
            [styles['edit-active']]: this.state.isActive,
        })

        return (
            <div
              role="button"
              tabIndex="-1"
              draggable="true"
              ref={el => (this.mainEle = el)}
              className={questionClassName}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDrop={this.handleDrop}
            >
                <div className={styles['drag-handle']}>
                    <Icon wrapClassName={styles['drag-icon']} className={'iconfont icon-drag'} />
                </div>
                <Input
                  autoSelect
                  className={styles.title}
                  defaultValue={this.props.title}
                  handleSaveText={handleSaveTitle}
                />
                {this.renderTypeMenu()}
                {type === 'text' ? this.renderTextArea() : this.renderOptionArea()}
                {this.renderActions()}
            </div>
        )
    }
}

export default Question
