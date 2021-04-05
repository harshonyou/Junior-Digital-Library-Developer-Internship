import { Button, ButtonGroup, Link } from "@material-ui/core"
import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello World!</h1>
    <p>Welcome to the Development Version of Storytelling Feature</p>
    <p>Here are the links to different commonents.</p>

    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      <Button>
        <Link href="http://localhost:8000/Story/customRequest/" color="inherit">
          Custom Request
        </Link>
      </Button>
      <Button>
        <Link href="http://localhost:8000/Story/slideShowRequest" color="inherit">
          Slide Show Request
        </Link>
      </Button>
    </ButtonGroup>
  </Layout>
)

export default IndexPage
