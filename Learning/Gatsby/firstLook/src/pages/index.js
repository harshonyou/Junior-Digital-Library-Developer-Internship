import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"



const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello, World!</h1>
    <p>Welcome to the First Trail of Gatsby.</p>
    <p>This is the First Look at Gatsby.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-3/">Go to Calculator</Link> <br />
    <button value='ok' onClick={(e) => {console.log('ayy')}}> hit me</button>
  </Layout>
)

export default IndexPage
