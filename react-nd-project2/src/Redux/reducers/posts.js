import { TYPES  } from '../actions/posts'

export default function posts(state = { } , action) { 
    switch(action.type){
        case TYPES.RECEIVE_POSTS: 
            return { 
                ...state, 
                ...action.posts
            }
        case TYPES.VOTE: 
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