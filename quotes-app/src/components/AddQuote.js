import React, { Fragment, Component } from 'react';
import { Form } from 'semantic-ui-react';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select'
import '../styles/App.css';

export default class AddQuote extends Component {

    state = {
        newTags: [],
        existingTags: this.props.tags,
        invalidQuoteAuthor: false,
        invalidTag: false
    }

    isValid = (str) => {
        const trimmedStr = str.trim();
        if (trimmedStr.length > 0) { return true }
        else return false
    }

    updateTagOptions = (tag) => {
        const remainingTags = this.state.existingTags.filter(t => t.name !== tag.name);
        this.setState({ existingTags: remainingTags });
    }

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
            this.updateTagOptions(newTag);
        }, 200);
    }

    handleTagSubmit = (event) => {
        event.preventDefault();
        let value = event.target.addedTag.value;
        event.target.addedTag.value = '';
        if (this.isValid(value)) {
            setTimeout(() => {
                const newTag = {
                    name: value,
                }
                this.setState({
                    newTags: [...this.state.newTags, newTag]
                })
                this.updateTagOptions(newTag);
            }, 200);
        } else {
            this.setState({ invalidTag: true })
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let content = event.target.quote.value;
        let author = event.target.author.value;
        event.target.quote.value = '';
        event.target.author.value = '';
        if (this.isValid(content) && this.isValid(author)) {
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
        } else {
            this.setState({ invalidQuoteAuthor: true })
        }
    }

    render() {
        return (
            <Fragment>
                <br />
                {this.state.invalidQuoteAuthor &&
                    <Alert className='emptyAlerts' variant='warning' onClose={() => this.setState({ invalidQuoteAuthor: false})} dismissible>
                        Quote and Author fields cannot be empty. If author is unknown, enter 'Anonymous'.
                    </Alert>
                }
                {this.state.invalidTag &&
                    <Alert className='emptyAlerts' variant='warning' onClose={() => this.setState({ invalidTag: false})} dismissible>
                        If adding new tag, field cannot be empty.
                    </Alert>
                }
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
                            options={this.state.existingTags.map(t => ({ key: t.id, label: t.name, value: t.name }))}
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
                <div className='tagsList'>
                    <h3>Added Tags</h3>
                    <ul>
                        {this.state.newTags.map(tag => (
                            <li key={tag.name}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            </Fragment >
        )
    }
}

