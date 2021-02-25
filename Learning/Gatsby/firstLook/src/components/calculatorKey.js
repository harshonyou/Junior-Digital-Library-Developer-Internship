import React from "react";

function CalculatorKey(props) {
    return (

            <input className={`${props.className}`}
                type="button"
                value={props.value}
                onClick={() => props.onClick(props.value)}
            >
            </input>

    );
}

export default CalculatorKey;