import React from "react"

import Header from "../components/core/header"
import Seo from "../components/core/seo"
import CalculatorBody from "../components/calculatorBody"
import Footer from "../components/core/footer"

import "../styles/layout.css"
import "../styles/styles.scss"

const Calculator = () => (
  <>
    <Header />
    <Seo title="Calculator" />
    <CalculatorBody />
    <Footer />
  </>
)

export default Calculator
