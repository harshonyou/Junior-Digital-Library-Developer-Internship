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
          {/* <div className="main-image">
            <Img fluid={data.poppinShades.childImageSharp.fluid}
            style={{maxHeight: '100%'}}/>
          </div>
          <a class="arrow arrow-left" title="Previous" href="javascript:;"></a>
          <div className="main-text">
            Ayy Lmao
          </div>
          <a class="arrow arrow-right" title="Previous" href="javascript:;"></a>

          <div className="author">
            Harsh Mohan
          </div> */}

        </div>

        <div className="content">
          <div className="inner-content">
            <p>
              hi this is my new blog {"\n"}
              hi this is my new blog
              hi this is my new blog
              hi this is my new blog
              hi this is my new blog
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BlogTemplate
