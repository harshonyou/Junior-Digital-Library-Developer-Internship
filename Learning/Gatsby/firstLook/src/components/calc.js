import React from "react"

import "../styles/layout.css"
import "../styles/styles.scss"

let Calculator = {
  display: "",
  firstOperand: null,
  secondOperand: null,
  operation: null,
  waitingForSecond: false,
}

function upateDisplay(value) {
  document.getElementById("Display").value = value
}

function pressedNum(value) {
  if (Calculator.waitingForSecond) {
    Calculator.display = value.toString()
    Calculator.waitingForSecond = false
  } else {
    Calculator.display =
      Calculator.display === "0" ? value : Calculator.display + value //Block Display
  }
  upateDisplay(Calculator.display)
}

function pressedOps(value) {
  if (
    Calculator.operation != null &&
    !Calculator.waitingForSecond &&
    Calculator.firstOperand != null
  ) {
    pressedEql()
  }
  Calculator.firstOperand = parseFloat(Calculator.display)
  Calculator.operation = value
  Calculator.display = value
  Calculator.waitingForSecond = true
  upateDisplay(Calculator.display)
}
function pressedEql() {
  if (Calculator.operation != null) {
    Calculator.secondOperand = parseFloat(Calculator.display)

    switch (Calculator.operation) {
      case "+":
        Calculator.firstOperand =
          Calculator.firstOperand + Calculator.secondOperand
        break
      case "-":
        Calculator.firstOperand =
          Calculator.firstOperand - Calculator.secondOperand
        break
      case "÷":
        Calculator.firstOperand =
          Calculator.firstOperand / Calculator.secondOperand
        break
      case "×":
        Calculator.firstOperand =
          Calculator.firstOperand * Calculator.secondOperand
        break
      default:
        return
    }
    Calculator.display = Calculator.firstOperand.toFixed(2)
    if (Calculator.display === parseInt(Calculator.firstOperand)) {
      Calculator.display = parseInt(Calculator.firstOperand)
    }
    Calculator.operation = null
    Calculator.waitingForSecond = true
  }
  upateDisplay(Calculator.display)
}
function deci() {
  if (!Calculator.display.includes(".")) Calculator.display += "."
  upateDisplay(Calculator.display)
}

function clear() {
  upateDisplay(0)
  Calculator.display = ""
  Calculator.firstOperand = null
  Calculator.secondOperand = null
  Calculator.isSecond = false
}

const Calc = () => (
  <div className="calculator">
    <div className="container">
      <div className="main-location">
        <div className="info">
          <h1>Calculatorulator</h1>
          <p>
            Welcome to the first project under the Internship by DTI, Uni of
            York. This is a simple Calculatorulator App created on the second
            day as an Intern.
            <br />
            Created on: 18th February, 2021.
          </p>
        </div>

        <div className="body">
          <tr>
            <td colSpan="3">
              <input
                className="display"
                type="text"
                value="0"
                id="Display"
                disabled
              />
            </td>
            <td>
              <input
                className="btn clr"
                type="button"
                value="C"
                onClick={e => {
                  clear()
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                className="btn"
                type="button"
                value="1"
                onClick={e => {
                  pressedNum(1)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="2"
                onClick={e => {
                  pressedNum(2)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="3"
                onClick={e => {
                  pressedNum(3)
                }}
              />
            </td>
            <td>
              <input
                className="btn opr"
                type="button"
                value="÷"
                onClick={e => {
                  pressedOps("÷")
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                className="btn"
                type="button"
                value="4"
                onClick={e => {
                  pressedNum(4)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="5"
                onClick={e => {
                  pressedNum(5)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="6"
                onClick={e => {
                  pressedNum(6)
                }}
              />
            </td>
            <td>
              <input
                className="btn opr"
                type="button"
                value="-"
                onClick={e => {
                  pressedOps("-")
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                className="btn"
                type="button"
                value="7"
                onClick={e => {
                  pressedNum(7)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="8"
                onClick={e => {
                  pressedNum(8)
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="9"
                onClick={e => {
                  pressedNum(9)
                }}
              />
            </td>
            <td>
              <input
                className="btn opr"
                type="button"
                value="+"
                onClick={e => {
                  pressedOps("+")
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                className="btn opr"
                type="button"
                value="."
                onClick={e => {
                  deci()
                }}
              />
            </td>
            <td>
              <input
                className="btn"
                type="button"
                value="0"
                onClick={e => {
                  pressedNum(0)
                }}
              />
            </td>
            <td>
              <input
                className="btn eql"
                type="button"
                value="="
                onClick={e => {
                  pressedEql()
                }}
              />
            </td>
            <td>
              <input
                className="btn opr"
                type="button"
                value="×"
                onClick={e => {
                  pressedOps("×")
                }}
              />
            </td>
          </tr>
        </div>
      </div>
    </div>
  </div>
)

export default Calc
