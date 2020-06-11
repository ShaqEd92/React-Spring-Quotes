import React, { Component, Fragment } from 'react';
import { isNumber } from 'underscore';
import NavBar from './NavBar';
import QuoteList from './QuoteList';
import AddQuote from './AddQuote';
import '../styles/App.css';

export default class App extends Component {

  state = {
    loaded: false,
    quotes: [],
    tags: [],
    visible: true,
    view: '',
    activeItem: ''
  }

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
        view: 'home',
        activeItem: 'home'
      })
    }, 2000);
  };

  handleViewChange = (show) => {
    this.setState({
      view: show
    })
  };

  handleActiveItem = (item) => {
    if (!isNumber(item)) this.handleViewChange(item);
    this.setState({
      activeItem: item
    })
  }

  handleDelete = async (id) => {
    console.log('clicked')
    await fetch(`/api/quotes/${id}`, {
      method: 'DELETE'
    });
    window.location.reload();
  }

  render() {
    return (
      <Fragment>
        {!this.state.loaded ?
          <img src='../loading.gif' className="loading" alt='loading wheel'></img> :
          <NavBar
            handleClick={this.handleActiveItem}
            handleDelete={this.handleDelete}
            activeItem={this.state.activeItem}
          />
        }
        {this.state.view === 'home' &&
          <QuoteList
            quotes={this.state.quotes}
            tags={this.state.tags}
            handleActiveItem={this.handleActiveItem}
            handleDelete={this.handleDelete}
          />
        }
        {this.state.view === 'add' &&
          <AddQuote
            tags={this.state.tags}
            fetchData={this.fetchData} />
        }
      </Fragment>
    );
  };
};
