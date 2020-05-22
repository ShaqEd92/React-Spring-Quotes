import React from 'react';
import { Card } from 'semantic-ui-react';
import '../styles/App.css';

const QuoteList = (props) => {

    const allQuotes = props.quotes.map(q =>
        <Card key={q.quote_id} ui centered card>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author} />
        </Card>
    )

    return (
        <div className='Quotes'>
            {allQuotes}
        </div>
    );
};

export default QuoteList;