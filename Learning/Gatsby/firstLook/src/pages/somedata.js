import React from "react"

import Header from "../components/core/header"
import Footer from "../components/core/footer"

import "../styles/hooks.scss"

const SomeData = (props) => {
    //<div>{!data ? 'loading...' : data}</div>
    console.log("SOME DATA STARTED")
    console.log(props)
    return (
        <>
        <Header />
        <div className="calculator"></div>
        <Footer />
        </>
    )
}

export default SomeData
