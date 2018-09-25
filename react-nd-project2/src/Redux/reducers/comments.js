import { TYPES } from '../actions/comments' 

export default function comments(state = { } , action){
    switch(action.type){
        case TYPES.RECEIVE_COMMENTS: 
            console.log(action)
            return { 
                ...state,
                ...action.comments
            }
        default: 
            return state
    }
}