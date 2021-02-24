import React, {useState, useEffect} from "react"

import "../styles/hooks.scss"

const Hooks = () => {

    const [state, setstate] = useState(()=>(0))

    const [toggle, settoggle] = useState(()=>(true))

    useEffect(() => {
        console.log('changed')
    }, [toggle])

    return (
        <>
          <p>{toggle && "Im kinda shy"}</p>
          <br/>
          <button onClick={()=> settoggle((pre)=> (!pre))}>toggle</button>
          <br/><br/>
          <button onClick={()=> setstate((pre)=> (pre-1))}>-</button>
              <span>{state}</span>
          <button onClick={()=> setstate((pre)=> (pre+1))}>+</button>
        </>
      )
}

export default Hooks
