import React from "react"
import { Link } from "gatsby"

import Header from "../components/header"
import Calc from "../components/calc"
import Footer from "../components/footer"

import "../styles/layout.css"
import "../styles/styles.scss"

const Calculator = () => (
  <>
    <Header />
    <Calc />
    <Footer />
  </>
)

export default Calculator
