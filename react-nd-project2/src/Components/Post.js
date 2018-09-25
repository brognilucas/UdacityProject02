import React, { Component } from 'react'
import { connect } from 'react-redux';
// import {  } from 'semantic-ui-react'
import { Button, Header, Modal, Icon, List } from 'semantic-ui-react'
import moment from 'moment'
import { handleSendVote } from '../Redux/actions/posts'
import { Link } from 'react-router-dom'
import PostDetail from './PostDetail';
class Post extends Component {

    vote = (vote, id) => {
        const { dispatch } = this.props

        dispatch(handleSendVote(vote, id))
    }

    render() {
        const { post } = this.props

        if (post === null)
            return <div></div>

        return (
            <List.Item>
                <List.Content floated='left'>
                    <div className="ui cards">
                        <div className="card">

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
                            <Link to={`/post/${post.id}`}> Show Detail </Link>
                            <div className="extra content">
                                <div className="floating ui teal label">
                                    {post.voteScore}
                                </div>
                                <div className="ui two buttons">
                                    <button onClick={() => this.vote('upVote', post.id)} className="ui basic green button">Up Vote  </button>

                                    <button onClick={() => this.vote('downVote', post.id)} className="ui basic red button">Down Vote </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </List.Content>
            </List.Item >

        )
    }
}

function mapStateToProps({ posts }, { id }) {

    const post = posts[id]


    return {
        post: post ? !post.deleted ? post : null : null
    }
}

export default connect(mapStateToProps)(Post)