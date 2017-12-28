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
        toggle: PropTypes.element.isRequired,
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
        if (this.toggle) {
            this.setState(prevState => ({
                isOpen: this.toggle.contains(e.target) && !prevState.isOpen,
            }))
        }
    }

    render() {
        const { wrapClassName, menuClassName, toggle, children } = this.props
        const menuClassNames = classnames({
            [menuClassName]: menuClassName && true,
            [styles.menu]: true,
        })

        return (
            <div
              role="button"
              tabIndex="0"
              className={wrapClassName}
              ref={(el) => { this.toggle = el }}
            >
                {toggle}
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
