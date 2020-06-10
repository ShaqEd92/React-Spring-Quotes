import React, { Fragment, Component } from 'react';
import { Card } from 'semantic-ui-react';
import underscore from 'underscore'
import ViewQuote from './ViewQuote';
import '../styles/App.css';

export default class QuoteList extends Component {

    state = { show: 'quotes', singleQuote: [] }

    handleClick = (id) => {
        if (id === 'quotes' || id === 'tags') {
            this.setState({
                show: id,
            })
            return true;
        }
        this.props.handleActiveItem('single')
        let oneQuote = this.props.quotes.filter(q => q.id === id);
        setTimeout(() => {
            this.setState({
                singleQuote: oneQuote,
                show: 'one'
            })
        }, 500);
    }

    allQuotes = underscore.shuffle(this.props.quotes).map(q =>
        <Card ui centered card key={q.id} onClick={() => this.handleClick(q.id)}>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author} />
        </Card>
    );

    allTags = underscore.shuffle(this.props.tags).map(q =>
        <Card ui centered card key={q.id}>
            <Card.Content description={q.name} />
        </Card>
    );

    render() {
        return (
            <Fragment>
                <br />
                {this.state.show !== 'one' &&
                    <h1 style={{ cursor: 'pointer' }}>
                        <span style={this.state.show === 'quotes' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }} onClick={() => this.handleClick('quotes')}>
                            Quotes&nbsp;
                        </span>
                        |
                        <span
                            style={this.state.show === 'tags' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                            onClick={() => this.handleClick('tags')}>
                            &nbsp;Tags
                        </span>
                    </h1>
                }
                <br />
                {this.state.show === 'one' &&
                    <ViewQuote singleQuote={this.state.singleQuote[0]} />
                }
                <div id="quotes" className='ui grid container'>
                    {this.state.show === 'quotes' && this.allQuotes}
                    {this.state.show === 'tags' && this.allTags}
                </div>
            </Fragment>
        );
    };
};