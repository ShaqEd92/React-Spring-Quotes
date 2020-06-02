import React, { Component } from 'react';
import { Icon, Menu, Sidebar, Segment, Sticky } from 'semantic-ui-react';
import QuoteList from './QuoteList';
import AddQuote from './AddQuote';
import EditQuote from './EditQuote';
import DeleteQuote from './DeleteQuote';
import ViewTags from './ViewTags';
import '../styles/App.css';

export default class App extends Component {

  state = { loaded: false, quotes: [], tags: [], visible: true, view: '' }

  fetchQuotesData = async () => {
    const resp = await fetch('/api/quotes')
    const quotesData = await resp.json();
    this.setState({
      quotes: quotesData
    })
  };

  fetchTagsData = async () => {
    const resp = await fetch('/api/tags')
    const tagsData = await resp.json();
    this.setState({
      tags: tagsData
    })
  };

  fetchData = () => {
    this.fetchQuotesData();
    this.fetchTagsData();
  }

  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      this.setState({
        loaded: true,
        view: 'home'
      })      
    }, 2000);
  };

  setVisible = (val) => {
    this.setState({
      visible: val
    })
  };

  handleClick = (show) => {
    this.setState({
      view: show
    })
  };

  render() {
    return (
      <Sidebar.Pushable as={Segment} style={{ border: 'none' }}>
        
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={this.state.visible}
          width='thin'
          style={{ background: '#0F1108' }}
          id='sticky'
        >
          <Menu.Item as='a' onClick={() => this.handleClick('home')}>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a' onClick={() => this.handleClick('add')}>
            <Icon name='quote left' />
            Add Quote
          </Menu.Item>
          <Menu.Item as='a' onClick={() => this.handleClick('edit')}>
            <Icon name='edit' />
            Edit Quote
          </Menu.Item>
          <Menu.Item as='a' onClick={() => this.handleClick('delete')}>
            <Icon name='trash alternate outline' />
            Delete Quote
          </Menu.Item>
          <Menu.Item as='a' onClick={() => this.handleClick('tags')}>
            <Icon name='tags' />
            View Tags
          </Menu.Item>
        </Sidebar>
        
        <Sidebar.Pusher style={{ background: '#EFF1F3' }} >
          <Segment basic style={{width: '75%'}}>
            {!this.state.loaded &&
              <img src='../loading.gif' className="loading"></img>
            }            
            {this.state.view === 'home' &&
              <QuoteList quotes={this.state.quotes} />
            }
            {this.state.view === 'add' &&
              <AddQuote tags={this.state.tags} fetchData={this.fetchData}/>
            }
            {this.state.view === 'edit' &&
              <EditQuote />
            }
            {this.state.view === 'delete' &&
              <DeleteQuote />
            }
            {this.state.view === 'tags' &&
              <ViewTags />
            }
          </Segment>
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    );
  };
};
