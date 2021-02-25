
import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer>
    <div className="container">
      <div className="inner-footer">
        <div className="logo">
          <Link to="/">HARSH</Link>
        </div>
        <div className="messgae">
          <p>Copyright © 2021</p>
        </div>
        <div className="navigation">
        <nav>
            <a href="https://github.com/harshonyou" target="_blank" rel="noopener noreferrer" >GH</a>
            <a href="https://www.linkedin.com/in/harshonyou/" target="_blank" rel="noopener noreferrer" >LI</a>
            <a href="https://dragoon.xyz/" target="_blank" rel="noopener noreferrer" >WS</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer