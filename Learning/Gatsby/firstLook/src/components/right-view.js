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
            From the very beginning, we have been told not to form any
            sort of addiction, yet we are enslaved to coffee. We keep on
            consuming it and till that extinct when our body receives more
            coffee than water as a liquid intake. There is no way coffee is
            any less addictive than any sort of drugs, but this one is like
            a cute little one within the devils.
            </p>
            <div className="btn-row">
                <Link to="/blogPage#2">View More &#8594;</Link>
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
