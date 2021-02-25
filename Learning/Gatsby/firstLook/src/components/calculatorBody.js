import React, {useState, useEffect} from "react"

import "../styles/layout.css"
import "../styles/styles.scss"
import Key from "./calculatorKey"

const Calculator = () => {

    const [previousValue, setpreviousValue] = useState(null)
    const [nextValue, setNextValue] = useState("0")
    const [operation, setOperation] = useState(null)

    const CalculatorOperations = {
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue) => firstValue - secondValue,
    };

    const handleNum = (number) => {
        setNextValue(nextValue === "0" ? String(number) : nextValue + number);
      };

    const insertDot = () => {
    if (!/\./.test(nextValue)) {
        setNextValue(nextValue + ".");
    }
    };
    const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (previousValue && nextValue === "") {
        setpreviousValue(parseFloat(previousValue) / 100);
    }
    };
    const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
    };

    const clearData = () => {
    setNextValue("0");
    setpreviousValue(null);
    setOperation(null);
    };

    const performOperation = () => {
        let temp = CalculatorOperations[operation](
          parseFloat(previousValue),
          parseFloat(nextValue)
        );
        console.log("TEMP :" +temp)
        setOperation(null);
        setNextValue(String(temp));
        setpreviousValue(null);
        console.log("ayy")
      };

      const p = () => {
          console.log("PRINTING :")
        console.log(previousValue)
        console.log(nextValue)
        console.log(operation)
        console.log("EXIT")
      }
    const checkOperation = () => {
        if((previousValue && operation && nextValue)){
            performOperation();
        }
    }

    const handleOperation = (value) => {
        if(Number.isInteger(value)){
            console.log("Number Entered: " +value)
            handleNum(parseInt(value, 10))
        }else if (value in CalculatorOperations) {
            console.log("Value : "+value)
            if (operation == null){
                setOperation(value)
                setpreviousValue(nextValue)
                setNextValue("")
            }
            if(operation){
                setOperation(value)
                p()
            }
            checkOperation()
        } else if (value === "="){
            console.log(nextValue)
            checkOperation()
        }
        else if (value === "C"){
            clearData();
        } else if (value === "\xB1"){
            changeSign();
        } else if (value === "."){
            insertDot();
        } else if (value === "%"){
            percentage();
        }
    }

    return (
        <div className="calculator">
        <div className="container" >
           <div className="main-location" id="target" >
              <div className="info">
                 <h1>Calculator</h1>
                 <p> Welcome to the first project under the Internship by DTI, Uni of York. This is a simple Calculator App created on the second day as an Intern.
                     <br /> Created on: 18th February, 2021.
                     <br /> Updated on: 24th February, 2021. [Added React Hooks]
                </p>
              </div>
              <div className="body">

                <div className="row">
                   <input className="display" type="text" value={nextValue} id="Display" disabled />
                </div>

                <div className="row">
                    <Key className="btn clr" value={"C"} onClick={handleOperation}/>
                    <Key className="btn" value={"\xB1"} onClick={handleOperation}/>
                    <Key className="btn" value={"%"} onClick={handleOperation}/>
                    <Key className="btn" value={"/"} onClick={handleOperation}/>
                </div>

                <div className="row">
                    <Key className="btn" value={1} onClick={handleOperation}/>
                    <Key className="btn" value={2} onClick={handleOperation}/>
                    <Key className="btn" value={3} onClick={handleOperation}/>
                    <Key className="btn" value={"*"} onClick={handleOperation}/>
                </div>

                <div className="row">
                    <Key className="btn" value={4} onClick={handleOperation}/>
                    <Key className="btn" value={5} onClick={handleOperation}/>
                    <Key className="btn" value={6} onClick={handleOperation}/>
                    <Key className="btn" value={"-"} onClick={handleOperation}/>
                </div>
                <div className="row">
                    <Key className="btn" value={7} onClick={handleOperation}/>
                    <Key className="btn" value={8} onClick={handleOperation}/>
                    <Key className="btn" value={9} onClick={handleOperation}/>
                    <Key className="btn" value={"+"} onClick={handleOperation}/>

                    </div>
                <div className="row">
                    <Key className="btn zero" value={0} onClick={handleOperation}/>
                    <Key className="btn" value={"."} onClick={handleOperation}/>
                    <Key className="btn eql" value={"="} onClick={handleOperation}/>
                </div>

              </div>
           </div>
        </div>
     </div>
    )
}

export default Calculator
