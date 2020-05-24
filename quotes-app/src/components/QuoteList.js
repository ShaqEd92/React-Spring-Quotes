import React from 'react';
import { Card, Segment, Icon } from 'semantic-ui-react';
import '../styles/App.css';

const QuoteList = (props) => {

    const allQuotes = props.quotes.map(q =>
        <Card key={q.quote_id} ui centered card>
            <Card.Content description={q.content} />
            <Card.Content extra description={q.author} />
        </Card>
    )

    return (
        <Segment basic>
            <h1>Quotes</h1>
            <Icon onClick={() => this.setVisible(true)} bordered color="#586BA4" link size="large" name='sidebar' className="tab" />
            <div className='Quotes'>
                {allQuotes}
            </div>
        </Segment>
    );
};

export default QuoteList;