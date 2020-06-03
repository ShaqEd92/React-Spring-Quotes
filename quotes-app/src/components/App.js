import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import QuoteList from './QuoteList';
import AddQuote from './AddQuote';
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
      <Fragment>
        {this.state.view === 'home' &&
          <Icon name='add' title='Add a Quote' size='huge' className='add circle' onClick={() => this.handleClick('add')} />
        }
        {(this.state.view != 'home' && this.state.loaded) &&
          <Icon name='home' size='huge' className='home' onClick={() => this.handleClick('home')} />
        }

        {!this.state.loaded &&
          <img src='../loading.gif' className="loading"></img>
        }
        {this.state.view === 'home' &&
          <QuoteList quotes={this.state.quotes} />
        }
        {this.state.view === 'add' &&
          <AddQuote tags={this.state.tags} fetchData={this.fetchData} />
        }
        {this.state.view === 'tags' &&
          <ViewTags />
        }
      </Fragment>
    );
  };
};
