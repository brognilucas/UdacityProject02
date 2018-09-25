export const addKeyPost = (posts) => {
    const objRet = { }
    Object.values(posts).map(post => { 
        objRet[post.id] = post
    })

    return objRet
}