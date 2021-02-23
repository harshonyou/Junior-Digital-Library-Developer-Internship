import React from "react"

function clear() {
    alert("nice");
}

const Func = () => (
  <footer>
     <div className="container">
      <div className="inner-footer">
        <div className="navigation">
          <p>
          <input className="btn clr" type="button" value="C" onClick={(e) => {clear()}}/>
          </p>
        </div>
      </div>
    </div>
  </footer>
)


export default Func
