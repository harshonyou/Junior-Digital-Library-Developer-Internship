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
            <Link to="/#about-blurb">About</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/blogs">Blogs</Link>
          </nav>
        </div>
      </div>
    </div>
  </header>
)

export default Header
