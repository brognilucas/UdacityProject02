import React, { Component } from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import {
    Modal, Header, Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPost, editPost } from '../Redux/actions/posts'

const PostForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const { post } = props


        if (post)
            return {
                title: post.title,
                body: post.body
            }

        return {
            title: '',
            author: '',
            category: '',
            body: ''
        }
    },
    isInitialValid: (props) => props.post,
    validate: (values, props) => {
        let errors = {};

        Object.keys(values).map(key => {
            if (values[key] === '')
                errors[key] = `Inform the ${key}`
        })

        return errors;
    },
    handleSubmit: (values, { props }) => {

        const { post } = props
        const { id } = props.match.params

        if (!post)
            props.dispatch(addPost(values))
        else
            props.dispatch(editPost(values, id))

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

                <Header icon='browser' content='Post' />
                <Modal.Content>
                    <Form className='ui form'>
                        <div className="field">
                            <span> Title </span>
                            <Field placeholder='Title' name="title" />
                            <ErrorMessage name="title" />
                        </div>
                        {!this.props.post && (
                            <div>
                                <div className="field">
                                    <span> Author </span>
                                    <Field placeholder='Author' name="author" />
                                    <ErrorMessage name="author" className='ui pointing red' />

                                    <div className="field">
                                        <span> Category </span>

                                        <Field component='select' placeholder='Category' name="category" className="ui selection dropdown">
                                            <option> Select an Category </option>
                                            {this.props.categories.map(category => {
                                                return <option value={category.name} key={category.name}> {category.name} </option>
                                            })}
                                        </Field>
                                        <ErrorMessage name="category" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="field">
                            <span> Post </span>
                            <Field placeholder='Your Post here' name="body" />
                            <ErrorMessage name="body" />
                        </div>

                        <Button type="submit" primary disabled={!this.props.isValid} >
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

function mapStateToProps({ posts, categories }, props) {
    const { id } = props.match.params

    if (id)
        return {
            post: posts[id],
            categories: Object.values(categories)
        }
    else
        return {
            categories: Object.values(categories)
        }

}

export default connect(mapStateToProps)(PostForm(MyForm))