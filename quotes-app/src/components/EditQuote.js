import React, { Fragment, Component } from 'react';
import { Button, Form, Divider, Grid, Segment } from 'semantic-ui-react';
import Select from 'react-select';
import '../styles/App.css';

export default class EditQuote extends Component {

    state = {
        updatedContent: this.props.singleQuote.content,
        updatedAuthor: this.props.singleQuote.author,
        updatedTags: [...this.props.singleQuote.tags],
        removedTag: [],
        tagOptions: this.props.tags
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.singleQuote.tags.map(tag => this.updateTagOptions(tag));            
        }, 500);
    }

    updateTagOptions = (tag) => {
        const remainingOptions = this.state.tagOptions.filter(t => t.name !== tag.name);
        this.setState({ tagOptions: remainingOptions });
    }

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
            this.updateTagOptions(newTag);
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
                updatedTags: [...this.state.updatedTags, newTag]
            })
            this.updateTagOptions(newTag);
        }, 200);
    }

    handleRemoveTag = (tag) => {
        const remainingTags = this.state.updatedTags.filter(t => t.name !== tag.name);
        const updatedOptions = [...this.state.tagOptions, tag]
        this.setState({ 
            updatedTags: remainingTags,
            tagOptions: updatedOptions
        })
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
        this.props.handleViewChange('home');
        setTimeout(() => {
            this.props.handleClick(this.props.singleQuote.id)
        }, 500);
        this.props.handleHomeView('oneQuote')
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
                            {this.state.updatedTags.map(t =>
                                <Fragment>
                                    <Button.Group style={{marginBottom: '2%'}}>
                                        <Button content={t.name} />
                                        <Button
                                            onClick={() => this.handleRemoveTag(t)}
                                            labelPosition='right'
                                            icon='delete'
                                        />
                                    </Button.Group>
                                    &nbsp; &nbsp;
                                </Fragment>
                            )}
                            <Select
                                placeholder='Select tag(s)'
                                onChange={this.handleSelectChange}
                                options={this.state.tagOptions.map(t => ({ key: t.id, label: t.name, value: t.name }))}
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

