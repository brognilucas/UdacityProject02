import React, { Component } from 'react'
import { Modal, Button, Icon, Header, Input, TextArea, Form } from 'semantic-ui-react'

class CommentForm extends Component {


    handleClose = () => {
        this.props.history.goBack()
    }

    submitComment = () => {

    }

    state = {
        name: '',
        comment: ''
    }



    render() {
        return (
            <Modal
                open={true}
                onClose={this.handleClose}
                size='small'>

                <Header icon='browser' content='Comment' />
                <Modal.Content>
                    <Form onSubmit={() => this.submitComment}>
                        <Input placeholder='Name' value={this.state.name} onChange={(e) => this.setState(() => ({
                            name: e.target.value
                        }))} />
                        <TextArea autoHeight placeholder='Try adding multiple lines' rows={2} value={this.state.comment}
                            onChange={(e) => this.setState(() => ({
                                comment: e.target.value
                            }))}

                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default CommentForm