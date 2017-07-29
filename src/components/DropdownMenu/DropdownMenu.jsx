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

    handleClick() {
        this.setState({
            isActive: !this.state.isActive,
        })
    }

    render() {
        return (
            <div
              role="button"
              tabIndex="0"
              className={this.props.wrapClassName}
              onClick={this.handleClick}
            >
                {this.props.dropdownButton}
                {
                    this.state.isActive &&
                    (
                        <Menu
                          wrapClassName={styles.menu}
                          wrapStyle={this.props.menuStyle}
                        >
                            {this.props.children}
                        </Menu>
                    )
                }
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
