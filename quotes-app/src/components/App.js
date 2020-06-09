import React, { Component, Fragment } from 'react';
import NavBar from './NavBar';
import QuoteList from './QuoteList';
import AddQuote from './AddQuote';
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

  handleViewChange = (show) => {
    console.log('app click')
    this.setState({
      view: show
    })
  };

  render() {
    return (
      <Fragment>
        {!this.state.loaded ?
          <img src='../loading.gif' className="loading" alt='loading wheel'></img> :
          <NavBar
            handleClick={this.handleViewChange}
          />
        }
        {this.state.view === 'home' &&
          <QuoteList quotes={this.state.quotes} tags={this.state.tags} />
        }
        {this.state.view === 'add' &&
          <AddQuote tags={this.state.tags} fetchData={this.fetchData} />
        }
      </Fragment>
    );
  };
};
