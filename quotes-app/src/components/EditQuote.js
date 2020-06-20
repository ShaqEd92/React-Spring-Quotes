import React, { Fragment, Component } from 'react';
import { Button, Form, Divider, Grid, Segment } from 'semantic-ui-react';
import Select from 'react-select'
import '../styles/App.css';

export default class EditQuote extends Component {

    state = {
        newTags: [],
        prevContent: this.props.singleQuote.content,
        prevAuthor: this.props.singleQuote.author
    }

    options = this.props.tags.map(t => ({ key: t.id, label: t.name, value: t.name }))

    handleContentChange = (event) => {
        const { target: { value } } = event;
        this.setState({ prevContent: value });
    }

    handleAuthorChange = (event) => {
        const { target: { value } } = event;
        this.setState({ prevAuthor: value });
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
        this.props.fetchData();
        this.props.handleViewChange('home')
    }

    render() {
        return (
            <Fragment>
                <h1>Edit Quote</h1>
                <Segment style={{ background: 'transparent' }}>
                    <Grid columns={2} relaxed='very'>

                        <Grid.Column>
                            <Form onSubmit={this.handleSubmit}>
                                <h2>Quote</h2>
                                <Form.Group>
                                    <Form.TextArea
                                        width={16}
                                        value={this.state.prevContent}
                                        onChange={this.handleContentChange}
                                    />
                                </Form.Group>
                                <h2>Author</h2>
                                <Form.Group>
                                    <Form.Input
                                        width={16}
                                        value={this.state.prevAuthor}
                                        onChange={this.handleAuthorChange}
                                    />
                                </Form.Group>
                                <Form.Button>Update Quote</Form.Button>
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <h2>Tags</h2>
                            {this.props.singleQuote.tags.map(t =>
                                <Button.Group>
                                    <Button content={t.name} />
                                    <Button labelPosition='right' icon='delete' />
                                </Button.Group>
                            )}
                            <Select
                                placeholder='Select tag(s)'
                                onChange={this.handleSelectChange}
                                options={this.options}
                            />
                            <br />
                            <br />
                            <Form onSubmit={this.handleTagSubmit}>
                                <Form.Input
                                    placeholder='Add new tag...'
                                    name='addedTag'
                                    onChange={this.handleChange}
                                />
                        &nbsp; &nbsp;
                        <Form.Button>+</Form.Button>
                            </Form>
                        </Grid.Column>

                    </Grid>
                    <Divider vertical>And</Divider>
                </Segment>
            </Fragment>
        )
    }
}

