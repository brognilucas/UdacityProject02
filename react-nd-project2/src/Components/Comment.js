import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Segment, Label, Button } from 'semantic-ui-react'
import moment from 'moment'
import CommentForm from './CommentForm';
import { Link , withRouter } from 'react-router-dom'
import { deleteComment , voteComment } from '../Redux/actions/comments'
class Comment extends Component {
    
    vote = (vote , id) => {
        const { dispatch } = this.props

        dispatch(voteComment(vote, id))
    }

    removeComment =  (comment ) => {
        const { dispatch } = this.props
        
        dispatch(deleteComment(comment))
    }

    render() {
        const { comment } = this.props
        return (
            <Segment>
                <Container>
                    <Header>
                        <Header.Subheader>
                            By: {comment.author} at {moment(comment.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                        </Header.Subheader>
                    </Header>
                    <p>
                        {comment.body}
                    </p>
                    <div>
                        <button onClick={() => this.vote('upVote', comment.id)} className="ui basic green button">Up Vote  </button>
                        <Label color='red' floating>
                            { comment.voteScore}
                        </Label>
                        <button onClick={() => this.vote('downVote', comment.id)} className="ui basic red button">Down Vote </button>
                    </div>
                    <div style={{paddingTop: 10}}>
                        <Link to={`/post/${comment.parentId}/comment/${comment.id}`}> <Button content='Edit Comment' /></Link>
                        <Button negative content='Remove comment' onClick={ () => this.removeComment(comment)} />
                    </div>
                </Container>
            </Segment >
        )
    }
}

function mapStateToProps({ comments }, {id} ) {

  
    const comment = comments[id]

    return {
        comment
    }
}

export default withRouter(connect(mapStateToProps)(Comment))