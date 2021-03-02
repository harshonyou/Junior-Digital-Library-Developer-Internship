// Rendering Static Blog Page

import React, {useState, useEffect} from "react"
import { useFetch } from "../components/hooks/useFetch"

import Header from "../components/core/header"
import Footer from "../components/core/footer"
import Template from "../components/blogTemplate"

import "../styles/hooks.scss"

const Blog = () => {

    const [state, setstate] = useState(()=> 0)

    useEffect(() => {
        let link = window.location.href.split('/')
        let number = link[link.length-1].substr(1)
        console.log(number)
        setstate(number)
    }, [])

    const { data, loading } = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${state}`
      )

    //<div>{!data ? 'loading...' : data}</div>
    return (
        <>
        <Header />
        {/* <div className="fourofour" style={{visibility: loading ? "hidden" : "visible"}}>
            <div>Blog ID: {data.id}</div>
            <div>Title: {data.title}</div>
            <div>Body: {data.body}</div>
            <div>User ID: {data.userId}</div>
        </div> */}

        <Template />
        <Footer />
        </>
    )
}

export default Blog
