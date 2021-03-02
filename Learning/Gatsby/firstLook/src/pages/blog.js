//Type of dynamic blog pages generated using useFetch custom hook, and using href location.

import React, {useState, useEffect} from "react"

import Header from "../components/core/header"
import Footer from "../components/core/footer"
import OtherData from "../components/blogData"

import { useFetch } from "../components/hooks/useFetch"

import "../styles/hooks.scss"

const SomeData = () => {
    //<div>{!data ? 'loading...' : data}</div>

    //
    const [state, setstate] = useState(0)

    // useEffect(() => {
    //     let link = window.location.href.split('/')
    //     let number = link[link.length-1].substr(1)
    //     console.log(number)
    //     if(isNaN(number))
    //         setstate(number)
    // }, [])


    useEffect(() => {
        let link = window.location.href.split('/')
        let number = link[link.length-1].substr(1)
        console.log(number)
        if(!isNaN(number))
            setstate(number)

    }, [window.location.href])

    const { data } = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${state}`
    )
    console.log(data)
    //

    return (
        <>
        <Header />
        <OtherData
            title={data.title}
            author={data.userId}
            content={data.body}
            id={data.id}
        />
        <Footer />
        </>
    )
}

export default SomeData
