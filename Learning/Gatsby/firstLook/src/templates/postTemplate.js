import React from 'react'

const PostTemplate = (props) => {

    // This is the `post` from `createPages`
    const post = props.pageContext

    console.log('post')
    console.log(post)

    return (
        <React.Fragment>

            hi

        </React.Fragment >
    );

}

export default PostTemplate