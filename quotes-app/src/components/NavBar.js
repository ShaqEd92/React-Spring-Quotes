import React, { Fragment } from 'react'
import { Input, Menu } from 'semantic-ui-react'

const NavBar = (props) => {

    return (
        <Fragment>
            <Menu attached='top' tabular>
                <Menu.Item
                    icon='home large'
                    title='Home'
                    active={props.activeItem === 'home'}
                    onClick={() => props.handleClick('home')}
                />
                <Menu.Item
                    icon='plus large'
                    title='Add a Quote'
                    active={props.activeItem === 'add'}
                    onClick={() => { props.handleClick('add') }}
                />
                {props.activeItem === 'single' &&
                    <Menu.Item
                        icon='edit large'
                        title='Edit Quote'
                        active={props.activeItem === 'edit'}
                        onClick={() => { props.handleClick('add') }}
                    />
                }
                {props.activeItem === 'single' &&
                    <Menu.Item
                        icon='delete large'
                        title='Delete Quote'
                        onClick={() => { props.handleClick('add') }}
                    />
                }
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

export default NavBar;