import React from "react"

import Header from "../components/core/header"
import CalculatorBody from "../components/calculatorBody"
import Footer from "../components/core/footer"

import "../styles/layout.css"
import "../styles/styles.scss"

const Calculator = () => (
  <>
    <Header />
    <CalculatorBody />
    <Footer />
  </>
)

export default Calculator
