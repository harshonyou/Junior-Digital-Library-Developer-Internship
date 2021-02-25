import React from "react"

import Header from "../components/core/header"
import Seo from "../components/core/seo"
import Banner from "../components/banner"
import AboutBlurb from "../components/aboutBlurb"
import Footer from "../components/core/footer"

import "../styles/styles.scss"

const IndexPage = () => (
  <>
    <Header />
    <Seo title="Home Page" description="Welcome to the Home Page"/>
    <Banner />
    <AboutBlurb />
    <Footer />
  </>
)

export default IndexPage
