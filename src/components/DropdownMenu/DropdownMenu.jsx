import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu/Menu'
import styles from './DropdownMenu.scss'

class DropdownMenu extends React.Component {
    constructor() {
        super()
        this.state = {
            isActive: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    handleClick(e) {
        if (this.button) {
            this.setState({
                isActive: this.button.contains(e.target) && !this.state.isActive,
            })
        }
    }

    render() {
        const menuClassName = this.state.isActive ? styles.menu : `${styles.menu} hidden`

        return (
            <div
              role="button"
              tabIndex="0"
              className={this.props.wrapClassName}
              ref={(ref) => { this.button = ref }}
            >
                {this.props.dropdownButton}
                <Menu
                  wrapClassName={menuClassName}
                  wrapStyle={this.props.menuStyle}
                >
                    {this.props.children}
                </Menu>
            </div>
        )
    }
}

DropdownMenu.propTypes = {
    children: PropTypes.array.isRequired,
    dropdownButton: PropTypes.element.isRequired,
    wrapClassName: PropTypes.string.isRequired,
    menuStyle: PropTypes.object.isRequired,
}

export default DropdownMenu
