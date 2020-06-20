import React, { Fragment } from 'react';
import { Card } from 'semantic-ui-react';
import underscore from 'underscore'
import ViewQuote from './ViewQuote';
import ViewTag from './ViewTag';
import '../styles/App.css';

const QuoteList = (props) => {

    const handleDelete = () => {
        props.handleDelete(props.singleQuote[0].id);
    }

    const allQuotes = underscore.shuffle(props.quotes).map(q =>
        <Card ui centered card key={q.id} onClick={() => props.handleClick(q.id)}>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author} />
        </Card>
    );

    const allTags = underscore.shuffle(props.tags).map(t =>
        <Card ui centered card key={t.id} onClick={() => props.handleTagClick(t.id)}>
            <Card.Content description={t.name} />
        </Card>
    );

    return (
        <Fragment>
            <br />
            {props.homeView !== 'oneQuote' && props.homeView !== 'oneTag' &&
                <h1 style={{ cursor: 'pointer' }}>
                    <span style={props.homeView === 'quotes' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }} onClick={() => props.handleClick('quotes')}>
                        Quotes&nbsp;
                        </span>
                        |
                        <span
                        style={props.homeView === 'tags' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                        onClick={() => props.handleClick('tags')}>
                        &nbsp;Tags
                        </span>
                </h1>
            }
            <br />
            {props.homeView === 'oneQuote' &&
                <ViewQuote
                    singleQuote={props.singleQuote}
                    handleDelete={handleDelete}
                />
            }
            {props.homeView === 'oneTag' &&
                <ViewTag
                    singleTag={props.singleTag}
                    quotes={props.quotes}
                    handleDelete={handleDelete}
                />
            }
            <div id="quotes" className='ui grid container'>
                {props.homeView === 'quotes' && allQuotes}
                {props.homeView === 'tags' && allTags}
            </div>
        </Fragment>
    );
};

export default QuoteList;