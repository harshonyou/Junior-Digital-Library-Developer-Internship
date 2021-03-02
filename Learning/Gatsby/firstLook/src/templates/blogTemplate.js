//Current model for the blog page, implemented using props
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

import Header from '../components/core/header'
import Footer from '../components/core/footer'


import '../styles/test.scss'

const BlogTemplate = (pro) => {
  const props = pro.pageContext
  const data = useStaticQuery(graphql`
    query  {
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
  let Pic = require(`../images/${props.image}`)
  console.log(pro)
  console.log(props)
  return (
    <>
    <Header/>
    <div className="blogpage">
      <div className="container">
        <div className="row" id={props.id}>
          <div className="main-image">
            {/* <Img fluid={data.poppinShades.childImageSharp.fluid}
            style={{maxHeight: '100%'}}/> */}

            <img src={Pic} alt="Italian Trulli" style={{maxHeight: '100%'}}/>

          </div>
          {/* <a className="arrow arrow-left" title="Previous" href="javascript:;"></a> */}
          <Link to={"/"+ props.target +"/" + (parseInt(props.id)-1)} className="arrow arrow-left" title="Previous" style={{visibility: props.id==props.range[0]? "hidden":"initial"}}></Link>
          <div className="main-text">
            {typeof props.title === 'string' ? props.title.substr(0, 15) : props.title}
          </div>
          {/* <a className="arrow arrow-right" title="Previous" href="javascript:;"></a> */}
          <Link to={"/"+ props.target +"/" + (parseInt(props.id)+1)} className="arrow arrow-right" title="Previous" style={{visibility: props.id==props.range[1]? "hidden":"initial"}}></Link>

          <div className="author" >
            {props.userId}
          </div>

        </div>

        <div className="content">
          <div className="inner-content">
            <p>
              {/* {props.body} */}
              <div dangerouslySetInnerHTML={{__html: props.body}}></div>
            </p>
          </div>
        </div>
      </div>

    </div>

    <Footer/>
    </>
  )
}

export default BlogTemplate
