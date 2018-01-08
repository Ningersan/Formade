import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Toggle from 'material-ui/Toggle'
import { Input, Icon, DropdownMenu } from '../../../../components/index'
import { RADIO, CHECKBOX, TYPES } from '../../../../constants/QuestionnaireTypes'
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

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    getInputClassName() {
        const { type } = this.props
        return classnames({
            [styles['symbol-radio']]: type === RADIO,
            [styles['symbol-checkbox']]: type === CHECKBOX,
        })
    }

    handleClick(e) {
        if (this.mainEle) {
            this.setState({ isActive: this.mainEle.contains(e.target) })
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
                  onChange={handleOptionChange(index)}
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
        const dropdownButton = (
            <Icon
              wrapClassName={styles.type}
              className={TYPES[type].className}
            >
                <span className={styles.content}>{TYPES[type].content}</span>
            </Icon>
        )

        return (
            <DropdownMenu
              wrapClassName={styles['type-chooser']}
              toggle={dropdownButton}
            >
                {Object.keys(TYPES).map((key, index) => (
                    <Icon
                      key={index}
                      wrapClassName={styles['type-item']}
                      className={TYPES[key].className}
                      onClick={() => handleSetQuestionType(key)}
                    >
                        <span className={styles.content}>{TYPES[key].content}</span>
                    </Icon>
                ))}
            </DropdownMenu>
        )
    }

    renderActions() {
        const { handleCopyQuestion, handleRemoveQuestion, handleToggleQuestion } = this.props
        const label = '必填'
        return (
            <div className={styles.control}>
                <div className={styles['footer-right']}>
                    <Icon
                      wrapClassName={styles['copy-question']}
                      className={'iconfont icon-copydownlink'}
                      onClick={handleCopyQuestion}
                    />
                    <Icon
                      wrapClassName={styles['delete-question']}
                      className={'iconfont icon-delete'}
                      onClick={handleRemoveQuestion}
                    />
                    <Icon
                      wrapClassName={styles['show-more-button']}
                      className={'iconfont icon-ellipsis-v'}
                    />
                    <Toggle
                      style={{ float: 'right', width: '90px', marginTop: '10px' }}
                      onToggle={handleToggleQuestion}
                      label={label}
                      labelStyle={{ fontSize: '16px' }}
                      trackSwitchedStyle={{ background: '#673ab7a8' }}
                      thumbSwitchedStyle={{ background: '#673ab7' }}
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
                  onSaveText={handleSaveTitle}
                />
                {this.renderTypeMenu()}
                {type === 'text' ? this.renderTextArea() : this.renderOptionArea()}
                {this.renderActions()}
            </div>
        )
    }
}

export default Question
