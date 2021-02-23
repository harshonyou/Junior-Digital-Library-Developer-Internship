import React from "react"
import { Link } from "gatsby"

import Header from "../components/header"
import Preview from "../components/preview"
import LeftView from "../components/left-view"
import RightView from "../components/right-view"
import Footer from "../components/footer"

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
