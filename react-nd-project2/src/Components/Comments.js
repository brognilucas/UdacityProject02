import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveCommentsHandle } from '../Redux/actions/comments'
import { Segment } from 'semantic-ui-react'
import { comment } from 'postcss';
class Comments extends Component {

    componentDidMount() {
        const { dispatch, id } = this.props

        dispatch(receiveCommentsHandle(id))
    }

    render() {
        const { comments } = this.props

        console.log(comments)
        return (
            <Segment>
                {comments.map(comment => (
                    <div key={comment}>
                        <p> {comment} </p>
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