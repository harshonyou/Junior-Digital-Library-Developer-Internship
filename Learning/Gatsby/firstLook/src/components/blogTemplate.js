import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const BlogTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      poppinShades: file(
        relativePath: { eq: "kensuke-saito-surf-photography-oY-BSScHYww-unsplash.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className="blogpage">
      <div className="container">
        <div className="row">
          <div className="main-image">
            <Img fluid={data.poppinShades.childImageSharp.fluid}
            style={{maxHeight: '100%'}}/>
          </div>
          <div className="side-arrow left">

          </div>
          <div className="main-text">
            Ayy Lmao
          </div>


          <div className="side-arrow right">

          </div>
        </div>

        <p>
          hi this is my new blog
          hi this is my new blog
          hi this is my new blog
          hi this is my new blog
          hi this is my new blog
        </p>
      </div>

    </div>
  )
}

export default BlogTemplate
