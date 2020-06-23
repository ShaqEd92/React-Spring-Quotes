import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react'
import { isNumber } from 'underscore'

const NavBar = (props) => {

    return (
        <Fragment>
            <Menu attached='top' tabular>
                <Menu.Item
                    icon='home large'
                    title='Home'
                    active={props.activeItem === 'home'}
                    onClick={() => {
                        props.handleClick('home')
                        props.handleHomeView('quotes')
                    }}
                />
                <Menu.Item
                    icon='plus large'
                    title='Add a Quote'
                    active={props.activeItem === 'add'}
                    onClick={() => { props.handleClick('add') }}
                />
                {isNumber(props.activeItem) &&
                    <Menu.Item
                        icon='quote right large'
                        active={isNumber(props.activeItem)}
                    />
                }
                {isNumber(props.activeItem) && props.homeView === 'oneQuote' &&
                    <Menu.Item
                        icon='edit large'
                        title='Edit Quote'
                        onClick={() => { props.handleClick('edit') }}
                    />
                }
                {isNumber(props.activeItem) &&
                    <Menu.Item
                        icon='delete large'
                        title='Delete Quote'
                        onClick={() => { props.handleDelete(props.activeItem) }}
                    />
                }
            </Menu>
        </Fragment>
    )
}

export default NavBar;