import React, { Fragment } from 'react';
import { Label } from 'semantic-ui-react';
import '../App.css';

const ViewTag = (props) => {

    const quotesWithTag = props.quotes.map(q =>
        <p style={{ fontSize: '1.5em' }}> "{q.content}" by {q.author}</p>
    )

    return (
        <Fragment>
            <Label as='a' color='#7A306C' size='huge' tag>{props.singleTag.name}</Label>
            <br /><br />
            {quotesWithTag}
        </Fragment>
    )
}

export default ViewTag;