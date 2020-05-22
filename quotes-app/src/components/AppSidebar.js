import React, { Component, Fragment } from 'react';
import '../styles/App.css';
import QuoteList from './QuoteList';
import { Icon, Menu, Sidebar, Segment } from 'semantic-ui-react';

export default class AppSidebar extends Component {

  constructor() {
    super();
    this.state = { quotes: [], visible: true }
  };

  fetchData = async () => {
    const resp = await fetch('/api/quotes')
    const data = await resp.json();
    this.setState({
      quotes: data
    })
  };

  componentDidMount() {
    this.fetchData();
  };

  setVisible = (val) => {
    this.setState({
      visible: val
    })
  }

  render() {
    return (

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => this.setVisible(false)}
          vertical
          visible={this.state.visible}
          width='thin'
        >
          <Menu.Item as='a'>
            <Icon name='home' />
          Home
        </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='quote left' />
          Add Quote
        </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='edit' />
          Edit Quote
        </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='trash alternate outline' />
          Delete Quote
        </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='tags' />
          View Tags
        </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <h1>Quotes</h1>
            <Icon onClick={() => this.setVisible(true)} bordered color="#A1B5D8" link size="large" name='sidebar' className="tab" />
            <QuoteList quotes={this.state.quotes} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  };
};
