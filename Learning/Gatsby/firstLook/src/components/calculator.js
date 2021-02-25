import React, {useState, useEffect} from "react"

import "../styles/layout.css"
import "../styles/styles.scss"
import Key from "./calculatorKey"

const Calculator = () => {

    const [prevValue, setPrevValue] = useState(null)
    const [nextValue, setNextValue] = useState("0")
    const [op, setOp] = useState(null)

    // useEffect(() => {}, [op, nextValue, prevValue]);

    const CalculatorOperations = {
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue) => firstValue - secondValue,
        "=": (firstValue, secondValue) => secondValue,
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
    if (prevValue && nextValue === "") {
        setPrevValue(parseFloat(prevValue) / 100);
    }
    };
    const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
    };
    const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
    };

    const performOperation = () => {
        let temp = CalculatorOperations[op](
          parseFloat(prevValue),
          parseFloat(nextValue)
        );
        setOp(null);
        setNextValue(String(temp));
        setPrevValue(null);
      };

    const handleOperation = (value) => {
        if(Number.isInteger(value)){
            handleNum(parseInt(value, 10))
        }else if (value in CalculatorOperations) {
            if (op == null){
                setOp(value)
                setPrevValue(nextValue)
                setNextValue("")
            }
            if(op){
                setOp(value)
            }
            if(prevValue && op && nextValue){
                performOperation();
            }
        } else if (value === "c"){
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
        <div className="container">
           <div className="main-location">
              <div className="info">
                 <h1>Calculator</h1>
                 <p> Welcome to the first project under the Internship by DTI, Uni of York. This is a simple Calculatorulator App created on the second day as an Intern. <br /> Created on: 18th February, 2021. </p>
              </div>
              <div className="body">
                 <table>
                <tbody>
                <tr>
                    <td colSpan="3"> <input className="display" type="text" value={nextValue} id="Display" disabled /> </td>
                    <Key className="btn clr" value={"c"} onClick={handleOperation}/>
                 </tr>
                </tbody>
                </table>
                 <table>
                <tbody>
                <tr>
                    <Key className="btn" value={1} onClick={handleOperation}/>
                    <Key className="btn" value={2} onClick={handleOperation}/>
                    <Key className="btn" value={3} onClick={handleOperation}/>
                    <Key className="btn eql" value={"/"} onClick={handleOperation}/>
                 </tr>
                </tbody>
                </table>
                 <table>
                <tbody>
                <tr>
                    <Key className="btn" value={4} onClick={handleOperation}/>
                    <Key className="btn" value={5} onClick={handleOperation}/>
                    <Key className="btn" value={6} onClick={handleOperation}/>
                    <Key className="btn eql" value={"-"} onClick={handleOperation}/>
                 </tr>
                </tbody>
                </table>
                 <table>
                <tbody>
                <tr>
                    <Key className="btn" value={7} onClick={handleOperation}/>
                    <Key className="btn" value={8} onClick={handleOperation}/>
                    <Key className="btn" value={9} onClick={handleOperation}/>
                    <Key className="btn eql" value={"+"} onClick={handleOperation}/>
                 </tr>
                </tbody>
                </table>
                 <table>
                <tbody>
                <tr>
                    <Key className="btn" value={"."} onClick={handleOperation}/>
                    <Key className="btn" value={0} onClick={handleOperation}/>
                    <Key className="btn eql" value={"="} onClick={handleOperation}/>
                    <Key className="btn eql" value={"*"} onClick={handleOperation}/>
                 </tr>
                </tbody>
                </table>
              </div>
           </div>
        </div>
     </div>
    )
}

export default Calculator
