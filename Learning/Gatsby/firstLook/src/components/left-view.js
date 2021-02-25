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
            The covid-19 has bought some painful acts upon us.
            Meanwhile, we had never been this close to ourselves ever before.
            With alien situations, we had adopted ourselves to process various
            things differently. Thus, we have seen it both, our angels and demons.
            Now, it's just a matter of fact how we come out stronger.
            </p>
            <div className="btn-row">
                <Link to="/blogPage#1">View More &#8594;</Link>
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
