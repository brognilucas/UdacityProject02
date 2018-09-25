import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveCommentsHandle } from '../Redux/actions/comments'
import { Segment } from 'semantic-ui-react'
import Comment from './Comment'
class Comments extends Component {

    componentDidMount() {
        const { dispatch, id } = this.props

        dispatch(receiveCommentsHandle(id))
    }

    render() {
        const { comments } = this.props

        return (
            <Segment>
                <h3> Comments </h3>
                {comments.map(comment => (
                    <div key={comment}>
                        <Comment id={comment} />
                    </div>
                ))}
            </Segment>
        )
    }
}

function mapStateToProps({ comments }, { id }) {

    return {
        id,
        comments: Object.keys(comments).sort( (a,b) => comments[b].voteScore - comments[a].voteScore)
    }
}

export default connect(mapStateToProps)(Comments)