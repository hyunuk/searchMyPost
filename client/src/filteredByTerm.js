const filteredByTerm = (term, data) => data.reduce((filtered, elem) => {
    if (elem?.message?.includes(term)) {
        const refPoint = elem.message.indexOf(term)
        const [userLink, postLink] = elem.id.split('_')
        filtered.push({
            createdTime: elem.created_time,
            message: elem.message ?? '',
            link: `https://www.facebook.com/${userLink}/posts/${postLink}`,
            snippet: elem.message.substring(refPoint - 50, refPoint + 50),
        })
    }
    return filtered
}, [])

export default filteredByTerm
