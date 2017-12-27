import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Menu from '../Menu/Menu'
import styles from './DropdownMenu.scss'

class DropdownMenu extends Component {
    static propTypes = {
        wrapClassName: PropTypes.string.isRequired,
        menuClassName: PropTypes.string,
        children: PropTypes.array.isRequired,
        dropdownButton: PropTypes.element.isRequired,
    }

    constructor() {
        super()
        this.state = { isActive: false }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    handleClick(e) {
        if (this.button) {
            this.setState(prevState => ({
                isActive: this.button.contains(e.target) && !prevState.isActive,
            }))
        }
    }

    render() {
        const { wrapClassName, menuClassName, dropdownButton, children } = this.props
        const menuClassNames = classnames({
            [menuClassName]: menuClassName && true,
            [styles.menu]: true,
            hidden: !this.state.isActive,
        })

        return (
            <div
              role="button"
              tabIndex="0"
              className={wrapClassName}
              ref={(ref) => { this.button = ref }}
            >
                {dropdownButton}
                <Menu wrapClassName={menuClassNames}>
                    {children}
                </Menu>
            </div>
        )
    }
}

export default DropdownMenu
