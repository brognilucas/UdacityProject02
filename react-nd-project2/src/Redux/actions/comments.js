import axios from 'axios'
import { API , HEADER  } from '../../config'
import { formatComment } from '../../Utils/addKeys';
export const TYPES = { 
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS' ,

}

function receiveComments(comments){
    return { 
        type: TYPES.RECEIVE_COMMENTS, 
        comments
    }
}
export function receiveCommentsHandle(id){
    return async (dispatch) => {
        const { data } = await axios.get(`${API}/posts/${id}/comments` , HEADER)
        const comments = data

        dispatch(receiveComments(formatComment(comments)))

    }
}   