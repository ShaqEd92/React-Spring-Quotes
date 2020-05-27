import React, { Fragment, Component } from 'react';
import { Form } from 'semantic-ui-react';
import '../styles/App.css';

export default class AddQuote extends Component {

    state = { quoteContent: '', authorName: '', newTag: '', newTags: [] }

    options = this.props.tags.map(t => ({ key: t.tag_id, text: t.name, value: t.name }))

    addedTags = this.state.newTags.map(t => <button key={t}>{t}</button>)

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if(event.target.name === 'addedTag'){
            this.setState({
                newTag: event.target.value
            })
        }
    }

    handleClick = () => {
        this.setState({
            newTags: [...this.state.newTags, this.state.newTag]
        })
    }

    addTag = () => {
        this.setState({
            newTags: [...this.state.newTags, this.state.newTag],
            newTag: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Quote content is ${event.target.quote.value}`);
        console.log(`Author is ${event.target.author.value}`);
        console.log(`Added tag is ${event.target.addedTag.value}`);
        console.log(this.state.newTags)
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
                                placeholder='Select tag'
                                name='existingTag'
                                onClick={this.handleClick}
                            />
                            <Form.Input
                                label='Add new tag(s)'
                                name='addedTag'
                                onChange={this.handleChange}
                            />
                            <Form.Button 
                                label='&nbsp;' 
                                onClick={this.addTag}> +
                            </Form.Button>
                        </Form.Group>
                    <Form.Button>Submit</Form.Button>
                    {this.addedTags}
                </Form>
            </Fragment >
        )
    }
}

