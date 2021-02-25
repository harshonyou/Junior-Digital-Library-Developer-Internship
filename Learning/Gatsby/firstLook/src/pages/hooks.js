import React, {useState, useEffect} from "react"
import { useTextFetch } from "../components/hooks/useTextFetch"
import { useForm } from "../components/hooks/useForm"

import "../styles/hooks.scss"

const Hooks = () => {

    const [state, setstate] = useState(undefined) //()=> JSON.parse(localStorage.getItem("count"))

    useEffect(() => {
        setstate(JSON.parse(localStorage.getItem("count")))
      }, [])

    const [toggle, settoggle] = useState(()=>(true))



    const {data} = useTextFetch(`http://numbersapi.com/${state}/trivia`)

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(state));
    }, [state])



    const [value, setValue] = useForm({email: "", password: ""})

    useEffect(() => {
        console.log("value")
        console.log(value)
    }, [value])

    return (
        <>
          <div>{data ? data :'loading...'  }</div>
          <div>
          <p>{toggle && "Im kinda shy"}</p>
          </div>
          <div>
          <button onClick={()=> settoggle((pre)=> (!pre))}>toggle</button>
          </div>
          <button onClick={()=> setstate((pre)=> (pre-1))}>-</button>
              <span>{state}</span>
          <button onClick={()=> setstate((pre)=> (pre+1))}>+</button>

        <div>
            <input name="email" type="email" placeholder="email" value={value.email} onChange={setValue}/>
            <input name="password" type="password" placeholder="password" value={value.password} onChange={setValue}/>
        </div>
        </>
      )
}

export default Hooks
