import React from "react"

import Header from "../components/core/header"
import Footer from "../components/core/footer"
import SEO from "../components/core/seo"

const NotFoundPage = () => (
  <>
    <Header/>
    <div className="fourofour">
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
    <Footer/>
  </>
)

export default NotFoundPage
