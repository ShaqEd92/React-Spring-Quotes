import React from 'react';
import { Label, Grid, Segment } from 'semantic-ui-react';
import '../App.css';

const ViewQuote = (props) => {

    return (
        <div className="single-quote">
            <Grid.Column>
                <Segment raised size='huge'>
                    <Label as='a' color='violet' ribbon icon='pencil'>
                        {props.singleQuote.author}
                    </Label>
                    {props.singleQuote.content}
                </Segment>
            </Grid.Column>
            <br />
            {props.singleQuote.tags.length === 0 ? <Label as='a' color='#7A306C' tag>There are currently no tags</Label> :
                props.singleQuote.tags.map(t =>
                    <div className="quoteTags">
                        <Label as='a' color='#7A306C' tag>{t.name}</Label> &nbsp;
                    </div>)
            }
        </div>
    )
}

export default ViewQuote;
