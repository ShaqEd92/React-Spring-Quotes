import React, { Fragment, Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../styles/App.css';

export default class AddQuote extends Component {

    state = { quoteContent: '', authorName: '', newTags: '' }

    options = this.props.tags.map(t => ({ key: t.name, text: t.name, value: t.name }))

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        })
        console.log()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Quote content is ${event.target.quote.value}`);
        console.log(`Author is ${event.target.author.value}`);
        console.log(`Tag is ${event.target.tag.value}`);
    }

    render() {
        return (
            <Fragment>
                <h1>Add a Quote</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.TextArea
                            width={16}
                            label='Quote'
                            placeholder='Add another great quote to the list...'
                            name='quote'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            width={16}
                            label='Author'
                            placeholder="Enter quote's author..."
                            name='author'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select
                            label='Select appropriate tag(s)'
                            options={this.options}
                            placeholder='Select tag' />
                        <Form.Input
                            label='Add new tag(s)'
                            name='tag'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </Fragment >
        )
    }
}

