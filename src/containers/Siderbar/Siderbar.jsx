import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from '../../components/index'
import styles from './Siderbar.scss'

class Siderbar extends Component {
    static propTypes = {
        siderRef: PropTypes.func.isRequired,
    }

    constructor() {
        super()
        // this.state = { isOpen: true }
    }

    render() {
        return (
            <div className={styles['sider-bar']} ref={this.props.siderRef} key={'siderbar'} >
                <div className={styles.logo}>Formade 表单</div>
                <Menu
                  wrapClassName={styles.menu}
                  itemClassName={styles['menu-item']}
                >
                    <Icon className={'fa fa-user fa-lg fa-fw'}>
                        <span className={styles['menu-item-text']}>登录</span>
                    </Icon>
                    <Icon className={'fa fa-cloud fa-lg fa-fw'}>
                        <span className={styles['menu-item-text']}>备份</span>
                    </Icon>
                </Menu>
            </div>
        )
    }
}

export default Siderbar
