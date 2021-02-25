import React from "react"

import Header from "../components/core/header"
import Preview from "../components/preview"
import LeftView from "../components/left-view"
import RightView from "../components/right-view"
import Footer from "../components/core/footer"

import "../styles/layout.css"
import "../styles/styles.scss"
import "../styles/blogs.scss"

const Blogs = () => (
  <>
    <Header />
    <Preview />
    <LeftView />
    <RightView />
    <Footer />
  </>
)

export default Blogs
