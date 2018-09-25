import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react'
import moment from 'moment'
import { handleSendVote } from '../Redux/actions/posts'
class Post extends Component {

    vote = (vote , id) => {
        const { dispatch } = this.props

        dispatch(handleSendVote(vote, id))
    }


    render() {
        const { post } = this.props
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
                                    By: {post.author} at { moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                </div>
                                <div className='meta'>
                                    Category: { post.category }
                                </div>
                                <div className="description">
                                    {post.body}
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="floating ui teal label">
                                    {post.voteScore}
                                </div>
                                <div className="ui two buttons">
                                    <button onClick={ () => this.vote('upVote', post.id)} className="ui basic green button">Up Vote  </button>

                                    <button onClick={ () => this.vote('downVote', post.id )}className="ui basic red button">Down Vote </button>
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

    return {
        post: !posts[id].deleted  ? posts[id] : null
    }
}

export default connect(mapStateToProps)(Post)