import axios from 'axios'
import { API, HEADER } from '../../config'
import { formatComment } from '../../Utils/addKeys';
import { generateId } from '../../Utils/generation'
import Swal from 'sweetalert2'
export const TYPES = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    REMOVE_COMMENT: 'REMOVE_COMMENT',
    VOTE_COMMENT: 'VOTE_COMMENT'
}

function receiveComments(comments) {
    return {
        type: TYPES.RECEIVE_COMMENTS,
        comments
    }
}

function addComment(comment) {
    return {
        type: TYPES.ADD_COMMENT,
        comment
    }
}

function editCommentHandler(comment){
    return { 
        type: TYPES.EDIT_COMMENT, 
        comment
    }
}

function deleteCommentHandler(id){
    return { 
        type: TYPES.REMOVE_COMMENT,
        id
    }
}

function voteCommentHandler(vote, id ){
    return { 
        type: TYPES.VOTE_COMMENT, 
        id, vote
    }
}

export function voteComment(vote, id){
    return (dispatch) => { 
      
        dispatch(voteCommentHandler(vote , id))

        axios.post(`${API}/comments/${id}`, { options: vote } , HEADER)
        .catch(err => {
            Swal('error', 'An error ocurred, try again', 'error')

            if (vote === 'downVote')
                dispatch(voteCommentHandler('upVote', id))
            else 
                dispatch(voteCommentHandler('downVote' , id))
        })
    }
}

export function receiveCommentsHandle(id) {
    return async (dispatch) => {
        const { data } = await axios.get(`${API}/posts/${id}/comments`, HEADER)
        const comments = data

        dispatch(receiveComments(formatComment(comments)))

    }
}

export function editComment({body}, id) { 
    return async (dispatch) => { 

        const { data } = await axios.put(`${API}/comments/${id}` , { 
            timestamp: Date.now(), 
            body
        },  HEADER )

        dispatch(editCommentHandler(data))
    }
}

export function deleteComment(comment) {
    return (dispatch) => {
        dispatch(deleteCommentHandler(comment.id))

        axios.delete(`${API}/comments/${comment.id}`, HEADER)
        .catch(err => { 
            console.warn('Error during the process of delete : ' , err)
            Swal('Error', 'An error ocurred. Try Again ','error')
            dispatch(addComment(comment))
        })

    }
}

export function sendComment(comment, id) {
    return async (dispatch) => {

        const { data } = await axios.post(`${API}/comments`, {
            id: generateId(),
            timestamp: Date.now(),
            body: comment.body,
            author: comment.author,
            parentId: id
        },
            HEADER)
        dispatch(addComment(data))
    }
}