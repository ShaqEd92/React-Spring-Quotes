import React, { Component, Fragment } from 'react';
import { isNumber } from 'underscore';
import NavBar from './NavBar';
import QuoteList from './QuoteList';
import AddQuote from './AddQuote';
import EditQuote from './EditQuote';
import '../styles/App.css';

export default class App extends Component {

  state = {
    loaded: false,
    quotes: [],
    tags: [],
    singleQuote: [],
    singleTag: [],
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

  fetchQuotesForTag = async () => {
    const resp = await fetch(`/api/quotes/tag/${this.state.singleTag[0].name}`)
    const data = await resp.json();
    console.log(data)
    this.setState({
      quotes: data
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
    this.setState({
      singleQuote: oneQuote,
      homeView: 'oneQuote'
    })
  }

  handleTagClick = (id) => {
    this.handleActiveItem(id);
    let oneTag = this.state.tags.filter(t => t.id === id);
    this.setState({ singleTag: oneTag })
    setTimeout(() => {
      this.fetchQuotesForTag();
      this.setState({ homeView: 'oneTag' })
    }, 300);
  }

  handleViewChange = (show) => {
    if (show === 'home') this.fetchQuotesData();
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
            homeView={this.state.homeView}
          />
        }
        {this.state.view === 'home' &&
          <QuoteList
            quotes={this.state.quotes}
            tags={this.state.tags}
            singleQuote={this.state.singleQuote[0]}
            singleTag={this.state.singleTag[0]}
            homeView={this.state.homeView}
            handleActiveItem={this.handleActiveItem}
            handleClick={this.handleClick}
            handleTagClick={this.handleTagClick}
            handleDelete={this.handleDelete}
          />
        }
        {this.state.view === 'add' &&
          <AddQuote
            tags={this.state.tags}
            handleViewChange={this.handleViewChange}
          />
        }
        {this.state.view === 'edit' &&
          <EditQuote
            tags={this.state.tags}
            singleQuote={this.state.singleQuote[0]}
            handleViewChange={this.handleViewChange}
          />
        }
      </Fragment>
    );
  };
};
