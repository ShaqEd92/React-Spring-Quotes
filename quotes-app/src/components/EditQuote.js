import React, { Fragment, Component } from 'react';
import { Button, Form, Divider, Grid, Segment } from 'semantic-ui-react';
import Select from 'react-select';
import '../styles/App.css';

export default class EditQuote extends Component {

    state = {
        updatedContent: this.props.singleQuote.content,
        updatedAuthor: this.props.singleQuote.author,
        updatedTags: [...this.props.singleQuote.tags],
        removedTag: []
    }

    options = this.props.tags.map(t => ({ key: t.id, label: t.name, value: t.name }))

    handleContentChange = (event) => {
        const { target: { value } } = event;
        this.setState({ updatedContent: value });
    }

    handleAuthorChange = (event) => {
        const { target: { value } } = event;
        this.setState({ updatedAuthor: value });
    }

    handleSelectChange = (event) => {
        setTimeout(() => {
            const newTag = {
                name: event.value,
            }
            this.setState({
                updatedTags: [...this.state.updatedTags, newTag]
            })
            console.log(this.state.updatedTags)
        }, 200);
    }

    handleRemoveTag = (tag) => {
        console.log('clicked')
        const remainingTags = this.state.updatedTags.filter(t => t.name !== tag.name);
        this.setState({ updatedTags: remainingTags})
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
                updatedTags: [...this.state.updatedTags, newTag]
            })
            console.log(this.state.updatedTags)
        }, 200);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const putData = {
            theQuote: {
                content: this.state.updatedContent,
                author: this.state.updatedAuthor
            },
            theTags: this.state.updatedTags
        }
        await fetch(`/api/quotes/${this.props.singleQuote.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData),
        });
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
                                        value={this.state.updatedContent}
                                        onChange={this.handleContentChange}
                                    />
                                </Form.Group>
                                <h2>Author</h2>
                                <Form.Group>
                                    <Form.Input
                                        width={16}
                                        value={this.state.updatedAuthor}
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
                                    <Button
                                        onClick={() => this.handleRemoveTag(t)}
                                        labelPosition='right'
                                        icon='delete'
                                    />
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

