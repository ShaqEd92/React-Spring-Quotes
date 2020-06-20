import React, { Fragment, Component } from 'react';
import { Form } from 'semantic-ui-react';
import Select from 'react-select'
import '../styles/App.css';

export default class AddQuote extends Component {

    state = { newTags: [] }

    options = this.props.tags.map(t => ({ key: t.id, label: t.name, value: t.name }))

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelectChange = (event) => {
        setTimeout(() => {
            const newTag = {
                name: event.value,
            }
            this.setState({
                newTags: [...this.state.newTags, newTag]
            })
            console.log(this.state.newTags)
        }, 200);
    }

    handleTagSubmit = (event) => {
        event.preventDefault();
        let value = event.target.addedTag.value;
        event.target.addedTag.value = '';
        setTimeout(() => {
            const newTag = {
                name: value,
            }
            this.setState({
                newTags: [...this.state.newTags, newTag]
            })
            console.log(this.state.newTags)
        }, 200);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let content = event.target.quote.value;
        let author = event.target.author.value;
        event.target.quote.value = '';
        event.target.author.value = '';
        const postData = {
            theQuote: {
                content: content,
                author: author
            },
            theTags: this.state.newTags
        }
        await fetch('/api/quotes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        });
        this.props.handleViewChange('home')
    }

    render() {
        return (
            <Fragment>
                <br />
                <h1>Add a Quote</h1>
                <div className="form-container">
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
                        <Select
                            placeholder='Select tag(s)'
                            onChange={this.handleSelectChange}
                            options={this.options}
                        />
                        <br />
                        <Form.Button>Submit Quote</Form.Button>
                    </Form>
                    <br />
                    <Form id="tagForm" onSubmit={this.handleTagSubmit}>
                        <Form.Input
                            placeholder='Add new tag...'
                            name='addedTag'
                            onChange={this.handleChange}
                        />
                        &nbsp; &nbsp;
                        <Form.Button>+</Form.Button>
                    </Form>
                </div>
            </Fragment >
        )
    }
}

