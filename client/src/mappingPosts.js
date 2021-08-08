const mappingPosts = data => data.map(elem => {
    const [userLink, postLink] = elem.id.split('_')
    return ({
        createdTime: elem.created_time,
        message: elem.message ?? '',
        link: `https://www.facebook.com/${userLink}/posts/${postLink}`,
    })
})

export default mappingPosts
