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
        button: PropTypes.element.isRequired,
    }

    static defaultProps = {
        menuClassName: null,
    }

    constructor() {
        super()
        this.state = { isOpen: false }
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
                isOpen: this.button.contains(e.target) && !prevState.isOpen,
            }))
        }
    }

    render() {
        const { wrapClassName, menuClassName, button, children } = this.props
        const menuClassNames = classnames({
            [menuClassName]: menuClassName && true,
            [styles.menu]: true,
        })

        return (
            <div
              role="button"
              tabIndex="0"
              className={wrapClassName}
              ref={(el) => { this.button = el }}
            >
                {button}
                {this.state.isOpen &&
                    <Menu wrapClassName={menuClassNames}>
                        {children}
                    </Menu>
                }
            </div>
        )
    }
}

export default DropdownMenu
