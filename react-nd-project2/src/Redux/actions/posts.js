import Axios from "axios";
import { HEADER, API } from "../../config";
import { addKeyPost } from '../../Utils/addKeys'
export const TYPES = { 
    RECEIVE_POSTS: 'RECEIVE_POSTS', 
    VOTE: 'VOTE'
}


function getPosts(posts){
    return { 
        type: TYPES.RECEIVE_POSTS, 
        posts
    }
}

function sendVote(vote , id){
    return { 
        type: TYPES.VOTE, 
        vote , id
    }
}


export function handleGetPosts(){
    return async (dispatch) => {
        const {data} = await Axios.get(API + '/posts' , HEADER)   

        dispatch(getPosts(addKeyPost(data)))
    }
}

export function handleSendVote(vote , id ){
    return async (dispatch) => {
        dispatch(sendVote(vote , id))
        Axios.post(API + `/posts/${id}` , { option: vote } , HEADER)
        .catch(error => {
            console.warn('An error ocurred ' , error)

            vote  === 'upVote' ? dispatch(sendVote('downVote')) : dispatch(sendVote('upVote'))
        })
    }
}