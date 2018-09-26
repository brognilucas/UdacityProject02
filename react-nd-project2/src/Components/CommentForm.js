import React, { Component } from 'react'
import { Modal, Button, Header } from 'semantic-ui-react'
import { withFormik, Form, Field , ErrorMessage} from 'formik'
import { connect } from 'react-redux'
import { sendComment, editComment } from '../Redux/actions/comments'


const CommentForm =
    withFormik({
        enableReinitialize: true,
        mapPropsToValues: (props) => {

            if (props.comment) {
                return {
                    body: props.comment.body
                }
            }

            return {
                author: '',
                body: ''
            }

        },
        isInitialValid: (props) => props.comment,
        validate: (values ) => {
            let errors = {};
    
            Object.keys(values).map(key => {
                if (values[key] === '')
                    errors[key] = `Inform the ${key}`
            })
    
            return errors;
        },
        handleSubmit: (values, { props }) => {
            if (props.comment) {
                props.dispatch(editComment(values, props.comment.id))
            }
            else {
                props.dispatch(sendComment(values, props.id))
            }

            props.history.goBack()
        }
    })

class MyForm extends Component {

    handleClose = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <Modal
                open={true}
                onClose={this.handleClose}
                size='small'>

                <Header icon='browser' content='Comment' />
                <Modal.Content>
                    <Form className='ui form'>

                        {!this.props.comment && (
                            <div className="field">
                                <span> Author </span>
                                <Field placeholder='Author' name="author" />
                                <ErrorMessage name="author" className='ui pointing red' />
                            </div>
                        )}
                        <div className="field">
                            <span> Comment </span>
                            <Field placeholder='Your Comment here' name="body" />
                            <ErrorMessage name="body" className='ui pointing red' />
                        </div>
                        <Button type="submit" primary disabled={!this.props.isValid}>
                            Submit
                        </Button>

                        <Button type="button" negative onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToProps({ comments }, props) {
    const { id, commentId } = props.match.params

    let comment = comments[commentId]
    if (commentId) {
        return {
            id, comment
        }
    }
    return {
        id
    }
}

export default connect(mapStateToProps)(CommentForm(MyForm))