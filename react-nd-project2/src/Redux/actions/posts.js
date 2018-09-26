import Axios from "axios";
import { HEADER, API } from "../../config";
import { addKeyPost } from '../../Utils/addKeys'
import { generateId } from "../../Utils/generation";
export const TYPES = { 
    RECEIVE_POSTS: 'RECEIVE_POSTS', 
    VOTE: 'VOTE', 
    REMOVE: 'REMOVE',
    ADD_POST: 'ADD_POST',
    EDIT_POST: 'EDIT_POST'
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
        post , id: post.id
    }
}

function addPostHandler(post){
    return { 
        type: TYPES.ADD_POST , 
        post
    }
}

function editPostHandler(post){
    return { 
        type: TYPES.EDIT_POST , 
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

export function addPost(post){
    return async (dispatch) => {
        post = { ...post , id: generateId() ,  timestamp: Date.now() }
        const { data } = await Axios.post(`${API}/posts` , post,  HEADER)
        
        dispatch(addPostHandler(data))
    }
}

export function editPost(post, id ){
    return async (dispatch) => {
       const {data} = await Axios.put(`${API}/posts/${id}` , post , HEADER)

       dispatch(editPostHandler(data))
    }
}