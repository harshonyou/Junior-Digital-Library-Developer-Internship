import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

import '../styles/styles.scss'

let Calc = {
  'display': '',
  'firstOperand': null,
  'secondOperand': null,
  'operation': null,
  'waitingForSecond': false
}

function upateDisplay(value) {
    //console.log('Display')
    document.getElementById("Display").value = value;
}

function pressedNum(value){
    console.log('Digit ' + value)
    if(Calc.waitingForSecond) {
        Calc.display=value.toString()
        Calc.waitingForSecond = false
    } else {
        Calc.display = Calc.display === '0' ? value : Calc.display + value //Block Display
    }
    upateDisplay(Calc.display)
}

function pressedOps(value) {
    console.log('Operator ' + value)
    if(Calc.operation!=null && !Calc.waitingForSecond && Calc.firstOperand!=null) {
        pressedEql()
    }
    Calc.firstOperand = parseFloat(Calc.display)
    Calc.operation = value
    Calc.display = value
    Calc.waitingForSecond = true
    upateDisplay(Calc.display)
}
function pressedEql() {
    console.log('=')
    if(Calc.operation != null) {
        Calc.secondOperand = parseFloat(Calc.display)
        if (Calc.operation === '+') {
        Calc.firstOperand = Calc.firstOperand+Calc.secondOperand
        } else if(Calc.operation === '-') {
        Calc.firstOperand = Calc.firstOperand-Calc.secondOperand
        } else if(Calc.operation === '÷') {
        Calc.firstOperand = Calc.firstOperand/Calc.secondOperand
        } else if(Calc.operation === '×') {
        Calc.firstOperand = Calc.firstOperand*Calc.secondOperand
        }
        Calc.display = Calc.firstOperand.toFixed(2)
        if(Calc.display === parseInt(Calc.firstOperand)) {
            Calc.display = parseInt(Calc.firstOperand)
        }
        Calc.operation = null
        Calc.waitingForSecond = true
    }
    upateDisplay(Calc.display)
}
function deci(){
    console.log('Digit .')
    if(!Calc.display.includes('.'))
        Calc.display+='.'
    upateDisplay(Calc.display)
}

function clear() {
    console.log('Clear')
    upateDisplay(0)
    Calc.display = ''
    Calc.firstOperand = null
    Calc.secondOperand = null
    Calc.isSecond = false
}

//alert(Calc.display)




const Calculator = () => (
  <>

  <Header/>

  <div className="calculator">

    <div className="container">
      <div className="main-location">


        <div className="info">
          <h1>Calculator</h1>
          <p>
            Welcome to the first project under the Internship by DTI, Uni of York.
            This is a simple Calculator App created on the second day as an Intern.
            <br/>
            Created on: 18th February, 2021.
          </p>

        </div>

        <div className="body">
          <tr>
            <td  colSpan="3"><input className="display" type="text" value="0" id="Display" disabled/></td>
            <td><input className="btn clr" type="button" value="C" onClick={(e) => {clear()}}/></td>
          </tr>

          <tr>
            <td><input className="btn" type="button" value="1" onClick={(e) => {pressedNum(1)}}/></td>
            <td><input className="btn" type="button" value="2" onClick={(e) => {pressedNum(2)}}/></td>
            <td><input className="btn" type="button" value="3" onClick={(e) => {pressedNum(3)}}/></td>
            <td><input className="btn opr" type="button" value="÷" onClick={(e) => {pressedOps('÷')}}/></td>
          </tr>

          <tr>
            <td><input className="btn" type="button" value="4" onClick={(e) => {pressedNum(4)}}/></td>
            <td><input className="btn" type="button" value="5" onClick={(e) => {pressedNum(5)}}/></td>
            <td><input className="btn" type="button" value="6" onClick={(e) => {pressedNum(6)}}/></td>
            <td><input className="btn opr" type="button" value="-" onClick={(e) => {pressedOps('-')}}/></td>
          </tr>

          <tr>
            <td><input className="btn" type="button" value="7" onClick={(e) => {pressedNum(7)}}/></td>
            <td><input className="btn" type="button" value="8" onClick={(e) => {pressedNum(8)}}/></td>
            <td><input className="btn" type="button" value="9" onClick={(e) => {pressedNum(9)}}/></td>
            <td><input className="btn opr" type="button" value="+" onClick={(e) => {pressedOps('+')}}/></td>
          </tr>

          <tr>
            <td><input className="btn opr" type="button" value="." onClick={(e) => {deci()}}/></td>
            <td><input className="btn" type="button" value="0" onClick={(e) => {pressedNum(0)}}/></td>
            <td><input className="btn eql" type="button" value="=" onClick={(e) => {pressedEql()}}/></td>
            <td><input className="btn opr" type="button" value="×" onClick={(e) => {pressedOps('×')}}/></td>
          </tr>
        </div>


      </div>

    </div>

  </div>
  </>
)

export default Calculator
