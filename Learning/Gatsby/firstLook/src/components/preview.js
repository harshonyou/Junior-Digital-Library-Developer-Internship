import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Preview = () => {
    const data = useStaticQuery(graphql`
    query {
      poppinShades: file(
        relativePath: { eq: "osman-rana-dI9KhXi0ooE-unsplash.jpg" }
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
    <div className="preview">
      <div className="container">
        <div className="row">
          <div className="side-image left"></div>
          <div className="main-text">Nerds Reunite</div>
          <div className="main-image">
            <Img fluid={data.poppinShades.childImageSharp.fluid} />
          </div>
          <div className="side-image right"></div>
        </div>
        <div class="load">
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
        </div>
        <div className="scroll">
          <span>Scroll Down</span>
        </div>

      </div>

    </div>
  )
}

export default Preview
