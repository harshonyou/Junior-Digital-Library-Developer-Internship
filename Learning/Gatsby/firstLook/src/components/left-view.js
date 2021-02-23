import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const LeftView = () => {
    const data = useStaticQuery(graphql`
    query {
      poppinShades: file(
        relativePath: { eq: "nicholas-kwok-VBWWscZtszY-unsplash.jpg" }
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
    <div className="view">
      <div className="container" >
        <div className="inner-view" id="tagretMe">
          <div className="content">
            <h3>The Isolation Remains Calm Within</h3>
            <p>
              I've just started the learning process as an Intern. Even tho, I
              haven't got much knowledge about GatsByJS, I've started creating
              and exloring couple of things on it. I'll keep on getting better
              and will be creating some good stuff in future.
            </p>
            <div className="btn-row">
                <Link to="/work">View More</Link>
            </div>
          </div>
          <div className="images">
            <div className="top-right" id="about-blurb">
              <Img fluid={data.poppinShades.childImageSharp.fluid} />
            </div>
          </div>
        </div>
      </div>
      <div className="black-box"></div>
      <div className="black-box overlay"></div>
    </div>
  )
}

export default LeftView
