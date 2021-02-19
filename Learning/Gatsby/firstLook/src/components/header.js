import React from "react"
import { Link } from "gatsby"


const Header = () => (
  <header>
    <div className="container">
      <div className="inner-header">
        <div className="logo">
          <Link to="/">HARSH</Link>
        </div>
        <div className="navigation">
          <nav>
            <Link to="/">About</Link>
            <Link to="/page-3">Calculator</Link>
            <Link to="/">Blogs</Link>
          </nav>
        </div>
      </div>
    </div>
  </header>
)


export default Header
