import React from "react"
import { Link } from "gatsby"

//import Layout from "../components/layout"
import Header from "../components/header"
import Banner from "../components/banner"
import Image from "../components/image"
import AboutBlurb from "../components/aboutBlurb"
import Footer from "../components/footer"

import '../styles/styles.scss'

const IndexPage = () => (
  <>
    <Header/>
    <Banner/>
    <AboutBlurb/>
    <Footer/>
  </>
)

export default IndexPage
