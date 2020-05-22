import React, { Component, Fragment } from 'react';
import '../styles/App.css';
import QuoteList from './QuoteList';
import { Container } from 'semantic-ui-react';

export default class App extends Component {

  constructor() {
    super();
    this.state = { quotes: []}
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

  render() {
    return (
      <Container>
        <h1>Quotes</h1>
        <QuoteList quotes={this.state.quotes} />
      </Container>
    );
  };
};
