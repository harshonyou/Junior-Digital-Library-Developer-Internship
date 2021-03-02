/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */


// I use axios to fetch the JSON
const axios = require('axios')

// Just a basic JS function for colling the API
const callApi = () => axios.get(`https://jsonplaceholder.typicode.com/posts/`)

// This function is called within the `createPages` function and will return the JSON
const fetchPosts = async () => {
    const response = await callApi()
    return response.data
};

// just a function to transform any string to a URL friendly string
function slugify(string, spacer = '-') {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, spacer) // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, spacer) // Replace multiple - with single -
        .replace(/-+$/, '') // Trim - from end of text
}

// Okay lets create some pages :)
exports.createPages = async ({ actions: { createPage } }) => {

    // First we need to call the API and get the posts
    const posts = await fetchPosts()

    if (posts.length > 0) {

        // We map through the posts
        posts.map((post) => {

            // We create an array with possible URL's for each post
            const postPaths = [
                "/post/" + slugify(post.id) + "/" + slugify(post.title),
                "/post/" + slugify(post.id)
            ]

            // Then we loop through the possible URL's and create the pages. 
            // createPage takes 3 arugments:
            // 1 - url (path)
            // 2 - a template
            // 3 - the post itself which you can you use on the template
            postPaths.map(postPath => {
                createPage({
                    path: postPath,
                    component: require.resolve('./src/templates/postTemplate.js'),
                    context: { post }
                })
            })

        })
    }
}