export const addKeyPost = (posts) => {
    const objRet = { }
    Object.values(posts).map(post => { 
        objRet[post.id] = post
    })

    return objRet
}


export const formatComment = (comments) => {
    const objComment = { }
    Object.values(comments).map(comment => {
        objComment[comment.id] = comment
    })

    return objComment
}