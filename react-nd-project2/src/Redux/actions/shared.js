import { handleReceiveCategories } from './categories'
import { handleGetPosts } from './posts'
export function handleGetInitialData() {
    return async (dispatch) => {
        dispatch(handleReceiveCategories())
        dispatch(handleGetPosts())
    }
}