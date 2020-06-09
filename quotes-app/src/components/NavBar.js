import React, { Component, Fragment } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class NavBar extends Component {

    state = { activeItem: 'home' }

    handleClick = (name) => {
        console.log('navbar click')
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (
            <Fragment>
                <Menu attached='top' tabular>
                    <Menu.Item
                        icon='home large'
                        active={activeItem === 'home'}
                        onClick={() => {
                            this.handleClick('home')
                            this.props.handleClick('home')
                        }}
                    />
                    <Menu.Item
                        icon='plus large'
                        active={activeItem === 'add'}
                        onClick={() => {
                            this.handleClick('add')
                            this.props.handleClick('add')
                        }}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{ name: 'search', link: true }}
                                placeholder='Search quotes...'
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Fragment>
        )
    }
}