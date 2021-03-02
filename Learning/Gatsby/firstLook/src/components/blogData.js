//Current model for the blog page, implemented using props
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

const BlogTemplate = (props) => {
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
  console.log("NICE")
  console.log(props)
  return (
    <div className="blogpage">
      <div className="container">
        <div className="row" id={props.id}>
          <div className="main-image">
            <Img fluid={data.poppinShades.childImageSharp.fluid}
            style={{maxHeight: '100%'}}/>
          </div>
          {/* <a className="arrow arrow-left" title="Previous" href="javascript:;"></a> */}
          <Link to={"/blog/#" + (parseInt(props.id)-1)} className="arrow arrow-left" title="Previous" style={{visibility: props.id=="1"? "hidden":"initial"}}></Link>
          <div className="main-text">
            {typeof props.title === 'string' ? props.title.substr(0, 15) : props.title}
          </div>
          {/* <a className="arrow arrow-right" title="Previous" href="javascript:;"></a> */}
          <Link to={"/blog/#" + (parseInt(props.id)+1)} className="arrow arrow-right" title="Previous" style={{visibility: props.id=="100"? "hidden":"initial"}}></Link>

          <div className="author">
            {props.author}
          </div>

        </div>

        <div className="content">
          <div className="inner-content">
            <p>
              {props.content}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BlogTemplate
