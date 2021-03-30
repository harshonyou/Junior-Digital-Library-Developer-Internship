import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlledLabel from "@material-ui/core/FormControlLabel"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"

import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"


import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"

import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
    border: 0,
    borderRadius: 15,
    color: 'White',
    padding: '0 30px'
  }
})

function ButtonStyles(){
  const classes = useStyle();
  return <Button className={classes.root}>Test Styles Button</Button>
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true)
  return (
      <div>
        <FormControlledLabel
          label="Testing Checkbox"
          control={
            <Checkbox
            checked = {checked}
            icon={<DeleteIcon/>}
            checkedIcon={<SaveIcon/>}
            onChange = {(e)=> setChecked(e.target.checked)}
            inputProps = {{
              'aria-label': 'secondary checkbox'
            }}
          />
          }
        />
      </div>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Container>
      <ButtonStyles/>
      <TextField
        variant="filled"
        color="secondary"
        type="email"
        label="The Time"
        placeholder="Time@Times.com"
      />
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Paper style={{height:75, width: "100%", color:"Red"}}/>
        </Grid>
        <Grid item>
          <Paper style={{height:75, width: 50, color:"Red"}}/>
        </Grid>
        <Grid item>
          <Paper style={{height:75, width: 50, color:"Red"}}/>
        </Grid>
      </Grid>
      <CheckboxExample/>
      <ButtonGroup>
        <Button
          startIcon={<SaveIcon/>}
          onClick={()=>{console.log("HEY")}}
          variant="contained"
          color="primary">
          Save
        </Button>
        <Button
          startIcon={<DeleteIcon/>}
          onClick={()=>{console.log("HEY")}}
          variant="contained"
          color="secondary">
          Discard
        </Button>
      </ButtonGroup>
    </Container>


  </Layout>
)

export default IndexPage
