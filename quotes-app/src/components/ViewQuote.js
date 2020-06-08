import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../styles/App.css';

const ViewQuote = (props) => {

    const handleDelete = async () => {
        console.log('clicked')
        await fetch(`/api/quotes/${props.singleQuote.id}`, {
            method: 'DELETE'
        });
    }

    return (
        <div className="single-quote">
            <p>
                <strong>{props.singleQuote.content}</strong>
                &nbsp; &nbsp;
                <Icon
                    name='edit'
                    title='Edit this quote'
                    onClick=''
                    style={{ cursor: 'pointer', outlineStyle: 'none' }}
                />
                &nbsp; &nbsp;
                <Icon
                    name='delete'
                    title='Delete this quote'
                    onClick={handleDelete}
                    style={{ cursor: 'pointer', outlineStyle: 'none' }}
                />
            </p>
            <p>- {props.singleQuote.author}</p>
            <br />
            <p style={{ textDecoration: 'underline' }}>Tags</p>
            {props.singleQuote.tags.length === 0 ?
                <p>There are currently no tags</p>
                : props.singleQuote.tags.map(t => <p>{t.name}</p>)
            }
        </div>
    )
}

export default ViewQuote;
