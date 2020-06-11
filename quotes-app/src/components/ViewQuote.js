import React from 'react';
import { Label, Grid, Segment, Image, ImageGroup } from 'semantic-ui-react';
import '../styles/App.css';

const ViewQuote = (props) => {

    return (
        <div className="single-quote">
            <Grid.Column>

                {/* <Image
                    fluid
                    label={{
                        as: 'a',
                        color: 'black',
                        content: props.singleQuote.author,
                        icon: 'pencil',
                        ribbon: true,
                    }}
                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                /> */}

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
                    <div className="tagsList">
                        <Label as='a' color='#7A306C' tag>{t.name}</Label> &nbsp;
                    </div>)
            }
        </div>
    )
}

export default ViewQuote;
