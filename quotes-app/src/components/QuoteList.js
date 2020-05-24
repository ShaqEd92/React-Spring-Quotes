import React, {Fragment} from 'react';
import { Card } from 'semantic-ui-react';
import '../styles/App.css';

const QuoteList = (props) => {

    const allQuotes = props.quotes.map(q =>
        <Card ui centered card key={q.content}>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author} />
        </Card>
    )

    return (
        <Fragment>
            <h1>Quotes</h1>
            <div id="quotes" className='ui grid container'>
                {allQuotes}
            </div>
        </Fragment>
    );
};

export default QuoteList;