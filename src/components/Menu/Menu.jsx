import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.scss'

class Menu extends React.Component {
    render() {
        return (
            <div className={this.props.wrapClassName}>
                {this.props.children.map((item, index) => (
                    <div key={index} className={styles['menu-item']}>
                        {item}
                    </div>
                ))}
            </div>
        )
    }
}

Menu.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Menu
