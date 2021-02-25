import React from "react"
import { Link } from "gatsby"

import Header from "../components/core/header"
import Calcu from "../components/calculator"
import Footer from "../components/core/footer"

import "../styles/layout.css"
import "../styles/styles.scss"

const Calculator = () => (
  <>
    <Header />
    <Calcu />
    <Footer />
  </>
)

export default Calculator
