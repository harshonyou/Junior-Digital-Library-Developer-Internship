import React from "react"

import Header from "../components/core/header"
import Banner from "../components/banner"
import AboutBlurb from "../components/aboutBlurb"
import Footer from "../components/core/footer"

import "../styles/styles.scss"

const IndexPage = () => (
  <>
    <Header />
    <Banner />
    <AboutBlurb />
    <Footer />
  </>
)

export default IndexPage
