import { TYPES } from '../actions/comments'

export default function comments(state = {}, action) {
    switch (action.type) {
        case TYPES.RECEIVE_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case TYPES.ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case TYPES.EDIT_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case TYPES.REMOVE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: true
                }
            }
        case TYPES.VOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: action.vote === 'upVote' ? state[action.id].voteScore + 1 : state[action.id].voteScore - 1
                }
            }
        default:
            return state
    }
}