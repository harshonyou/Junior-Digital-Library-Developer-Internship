import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const RightView = () => {
    const data = useStaticQuery(graphql`
    query {
      poppinShades: file(
        relativePath: { eq: "06-taylor-hill-paris.jpg" }
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
    <div className="view right">
      <div className="container" >
        <div className="inner-view" id="tagretMe">

          <div className="images">
            <div className="bottom-left" id="about-blurb">
              <Img fluid={data.poppinShades.childImageSharp.fluid} />
            </div>
          </div>

          <div className="content">
            <h3>The Legal Drug</h3>
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

        </div>
      </div>
      <div className="black-box right"></div>
      <div className="black-box overlay right"></div>
    </div>
  )
}

export default RightView
