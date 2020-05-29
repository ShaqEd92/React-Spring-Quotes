import React, { Fragment, Component } from 'react';
import { Form } from 'semantic-ui-react';
import '../styles/App.css';

export default class AddQuote extends Component {

    state = { newTags: [], assignedTags: [] }

    options = this.props.tags.map(t => ({ key: t.tag_id, text: t.name, value: t.name }))

    addedTags = this.state.newTags.map(t => <p><button key={t}>{t.name}</button></p>)

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTagSubmit = async (event) => {
        event.preventDefault();
        let value = event.target.addedTag.value;
        event.target.addedTag.value = '';
        const postData = {
            name: value,
        }
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        };
        const data = await fetch('/api/tags', config)
        this.setState({
            newTags: [...this.state.newTags, postData]
        })
        console.log(this.state.newTags);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const postData = {
            content: event.target.quote.value,
            author: event.target.author.value,
            tags: this.state.newTags
        }
        await fetch('/api/quotes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        });
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
                    <Form.Select
                        label='Select appropriate tag(s)'
                        options={this.options}
                        placeholder='Select tag'
                        name='existingTag'
                        onChange={this.handleChange}
                    />
                    <br />
                    <Form.Button>Submit Quote</Form.Button>
                </Form>

                <Form id="tagForm" onSubmit={this.handleTagSubmit}>
                    <Form.Input
                        label='Add new tag(s)'
                        name='addedTag'
                        onChange={this.handleChange}
                    />
                    <br />
                    <Form.Button>+</Form.Button>
                </Form>

                <div className='tagsList'>
                    <h4>Added Tags</h4>
                    {this.addedTags}
                </div>

            </Fragment >
        )
    }
}

