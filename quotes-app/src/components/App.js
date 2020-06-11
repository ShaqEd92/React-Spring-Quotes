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
    singleQuote: [],
    view: '',
    homeView: 'quotes',
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

  handleClick = (id) => {
    if (id === 'quotes' || id === 'tags') {
      this.setState({
        homeView: id
      })
      return true;
    }
    this.handleActiveItem(id)
    let oneQuote = this.state.quotes.filter(q => q.id === id);
    setTimeout(() => {
      this.setState({
        singleQuote: oneQuote,
        homeView: 'one'
      })
    }, 500);
  }

  handleViewChange = (show) => {
    this.setState({
      view: show
    })
  };

  handleHomeView = (show) => {
    this.setState({
      homeView: show
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
            handleHomeView={this.handleHomeView}
            handleDelete={this.handleDelete}
            activeItem={this.state.activeItem}
          />
        }
        {this.state.view === 'home' &&
          <QuoteList
            quotes={this.state.quotes}
            tags={this.state.tags}
            singleQuote={this.state.singleQuote[0]}
            homeView={this.state.homeView}
            handleActiveItem={this.handleActiveItem}
            handleClick={this.handleClick}
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
