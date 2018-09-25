import { TYPES } from '../actions/categories'


export default function categories(state = {}, action) {
    switch (action.type) {
        case TYPES.RECEIVE_CATEGORIES:
            return {
                ...state,
                ...action.categories
            }
        default: 
            return state
    }
}