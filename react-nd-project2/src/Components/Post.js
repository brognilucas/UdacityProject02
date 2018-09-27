import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Container, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { handleSendVote } from '../Redux/actions/posts'
import { Link } from 'react-router-dom'
import { receiveCommentsHandle } from '../Redux/actions/comments'
class Post extends Component {

    vote = (vote, id) => {
        const { dispatch } = this.props

        dispatch(handleSendVote(vote, id))
    }

    componentDidMount() {
        const { dispatch, id } = this.props

        dispatch(receiveCommentsHandle(id))
    }

    render() {
        const { post, replies } = this.props

        if (!post)
            return <div></div>

        return (
            <Card.Group>
                <Card fluid>
                    <div className="content">

                        <div className="header">
                            {post.title}
                        </div>
                        <div className="meta">
                            By: {post.author} at {moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                        <div className='meta'>
                            Category: {post.category}
                        </div>
                        <div className="description">
                            {post.body}
                        </div>
                    </div>
                    <Link to={`/${post.category}/${post.id}`}> Show Detail </Link>
                    <div className="extra content">
                        <Container fluid>
                            <Icon name='like' /> Points {post.voteScore}
                            <Icon style={{ marginLeft: 10 }} name='reply' /> Replies {replies}
                        </Container>

                        <button onClick={() => this.vote('upVote', post.id)} className="ui basic green button">Up Vote  </button>

                        <button onClick={() => this.vote('downVote', post.id)} className="ui basic red button">Down Vote </button>

                    </div>

                </Card>
            </Card.Group>

        )
    }
}

function mapStateToProps({ posts, comments }, { id }) {

    const post = posts[id]
    const replies = Object.keys(comments).filter(comment => {
        return comments[comment].parentId === id && !comments[comment].deleted
    })

    return {
        post: post ? post : null ,
        replies: replies.length
    }
}

export default connect(mapStateToProps)(Post)