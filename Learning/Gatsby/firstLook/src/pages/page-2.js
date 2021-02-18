import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

let Calc = {
  'display': '',
  'firstOperand': null,
  'secondOperand': null,
  'operation': null
}

function upateDisplay(value){
  document.getElementById("Display").value = value;
}

function pressedNum(value){
  Calc.display+=value.toString()
  if(Calc.operation!=null)
    upateDisplay(Calc.display.substr(1))
  else
    upateDisplay(Calc.display)
}

function pressedOps(value){
  if(Calc.operation!=null){
    Calc.display = value
  }
  else{
    Calc.firstOperand = parseFloat(Calc.display)
    Calc.operation = value
    Calc.display = value
  }
  upateDisplay(Calc.display)
}
function pressedEql(){
  if(Calc.operation != null){
    Calc.display = Calc.display.substr(1)
    Calc.secondOperand = parseFloat(Calc.display)
    if (Calc.operation === '+'){
      Calc.firstOperand = Calc.firstOperand+Calc.secondOperand
    }else if(Calc.operation === '-'){
      Calc.firstOperand = Calc.firstOperand-Calc.secondOperand
    }else if(Calc.operation === '/'){
      Calc.firstOperand = Calc.firstOperand/Calc.secondOperand
    }else if(Calc.operation === '*'){
      Calc.firstOperand = Calc.firstOperand*Calc.secondOperand
    }
    Calc.display = Calc.firstOperand.toFixed(4)
    Calc.operation = null
  }
  upateDisplay(Calc.display)
}
function deci(){
  if(!Calc.display.includes('.'))
    Calc.display+='.'
  upateDisplay(Calc.display)
}

function clear() {
  upateDisplay(0)
  Calc.display = ''
  Calc.firstOperand = null
  Calc.secondOperand = null
  Calc.isSecond = false
}

//alert(Calc.display)

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <div>
    <h1>Calculator</h1>
    <p>Welcome to the Calculator</p>
    <div id="Calculator"
    style={{
      background: '#f4f4f4',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingRight: '10px',
      paddingBottom: '20px',
      width: '300px',
      height: '300px',
    }}>
      <tr>
        <td colSpan="3"><input type="text" value="0" id="Display"/></td>
        <td><input type="button" value="C" onClick={(e) => {clear()}}/></td>
      </tr>

      <tr>
        <td><input type="button" value="1" onClick={(e) => {pressedNum(1)}}/></td>
        <td><input type="button" value="2" onClick={(e) => {pressedNum(2)}}/></td>
        <td><input type="button" value="3" onClick={(e) => {pressedNum(3)}}/></td>
        <td><input type="button" value="/" onClick={(e) => {pressedOps('/')}}/></td>
      </tr>

      <tr>
        <td><input type="button" value="4" onClick={(e) => {pressedNum(4)}}/></td>
        <td><input type="button" value="5" onClick={(e) => {pressedNum(5)}}/></td>
        <td><input type="button" value="6" onClick={(e) => {pressedNum(6)}}/></td>
        <td><input type="button" value="-" onClick={(e) => {pressedOps('-')}}/></td>
      </tr>

      <tr>
        <td><input type="button" value="7" onClick={(e) => {pressedNum(7)}}/></td>
        <td><input type="button" value="8" onClick={(e) => {pressedNum(8)}}/></td>
        <td><input type="button" value="9" onClick={(e) => {pressedNum(9)}}/></td>
        <td><input type="button" value="+" onClick={(e) => {pressedOps('+')}}/></td>
      </tr>

      <tr>
        <td><input type="button" value="." onClick={(e) => {deci()}}/></td>
        <td><input type="button" value="0" onClick={(e) => {pressedNum(0)}}/></td>
        <td><input type="button" value="=" onClick={(e) => {pressedEql()}}/></td>
        <td><input type="button" value="*" onClick={(e) => {pressedOps('*')}}/></td>
      </tr>
    </div>
    </div>
    <br/><br/><br/>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
