import Axios from "axios";
import { API , HEADER } from '../../config'
export const TYPES = {
    RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES'
}


function receiveCategories(categories) {
    return {
        type: TYPES.RECEIVE_CATEGORIES,
        categories
    }
}

export function handleReceiveCategories(){
    return async (dispatch) => {
        const {data} = await Axios.get(API + '/categories', HEADER )

        dispatch(receiveCategories(data.categories))
    }
}

