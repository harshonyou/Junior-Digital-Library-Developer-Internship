import React from "react";

function CalculatorKey(props) {
    return (
        <td>
            <input className={`${props.className}`}
                type="button"
                value={props.value}
                onClick={() => props.onClick(props.value)}
            >
            </input>
        </td>
    );
}

export default CalculatorKey;