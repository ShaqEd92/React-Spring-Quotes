import React, { Fragment, Component } from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import underscore from 'underscore'
import '../styles/App.css';

export default class QuoteList extends Component {

    state = { showAll: true, quoteId: '', singleQuote: [] }

    handleClick = (id) => {
        if(id === 'all'){
            this.setState({
                showAll: true,
                id: ''
            })
            return true;
        }
        this.setState({
            quote_id: id
        })
        let oneQuote = this.props.quotes.filter(q => q.id === id);
        setTimeout(() => {
            this.setState({
                singleQuote: oneQuote,
                showAll: false
            })
            console.log(this.state.singleQuote)
        }, 500);
    }

    allQuotes = underscore.shuffle(this.props.quotes).map(q =>
        <Card ui centered card key={q.id} onClick={() => this.handleClick(q.id)}>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author}/>
        </Card>
    );

    render() {
        return (
            <Fragment>
                <br/>
                <h1>Quotes | Tags</h1>
                <Icon name='home' size='huge' className='home' onClick={() => this.handleClick('all')}/>
                <br/>
                <div id="quotes" className='ui grid container'>
                    {this.state.showAll ? this.allQuotes :
                        <Card ui centered card>
                            <Card.Content description={this.state.singleQuote[0].content} />
                            <Card.Content extra description={this.state.singleQuote[0].author} />
                            {this.state.singleQuote[0].tags.map(t => <p>- {t.name}</p>)}
                        </Card>
                    }
                </div>
            </Fragment>
        );
    };
};