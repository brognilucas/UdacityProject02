import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Post from './Post'
import { List, Container, Button } from 'semantic-ui-react'
import { handleRemove } from '../Redux/actions/posts'
import Comments from './Comments'
import CommentForm from './CommentForm'

class PostDetail extends Component {

    remove = (id) => {
        const { dispatch } = this.props

        dispatch(handleRemove(id))

        this.props.history.push('/')
    }

    addComment = () => {
        return <CommentForm />
    }

    render() {
        const { post } = this.props

        if (post === null) {
            return (<div>
                <Link to='/'> Back </Link>
                <p>
                    This Post doesn't exist
                     </p>
            </div>
            )
        }

        const { id, category } = post

        return (

            <div>
                <Container textAlign='left'>
                    <Link to='/'> Back </Link>
                </Container>


                <Post id={id} />
                <List.Content>
                    <Button content='Remove' negative onClick={() => this.remove(id)} />
                    <Link to={`/post/${category}/${id}`} > <Button content='Edit Post' primary /></Link>
                    <Link to={`/post/${id}/comment/new`}> <Button content='Add Comment' /></Link>
                </List.Content>

                <Comments id={id} />
            </div>

        )
    }
}


function mapStateToProps({ posts }, props) {
    const { id } = props.match.params
    const post = posts[id]
    return {
        post: post ? post : null
    }
}

export default withRouter(connect(mapStateToProps)(PostDetail)) 