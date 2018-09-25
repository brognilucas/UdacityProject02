import Axios from "axios";
import { HEADER, API } from "../../config";
import { addKeyPost } from '../../Utils/addKeys'
export const TYPES = { 
    RECEIVE_POSTS: 'RECEIVE_POSTS', 
    VOTE: 'VOTE', 
    REMOVE: 'REMOVE'
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

function removePost(post){
    return { 
        type: TYPES.REMOVE , 
        post
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

export function handleRemove(id){
    return async (dispatch) => {
        const remove = await Axios.delete(API +  `/posts/${id}` , HEADER )
        
        dispatch(removePost(remove.data))
    }
}