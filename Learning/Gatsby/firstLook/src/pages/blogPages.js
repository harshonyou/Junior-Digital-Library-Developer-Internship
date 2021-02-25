import React, { useState, useEffect } from "react"
import { useFetch } from "../components/hooks/useFetch"

import "../styles/hooks.scss"

const Hooks = () => {
  const [state, setstate] = useState(() =>
    JSON.parse(localStorage.getItem("count"))
  )


  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(state))
  }, [state])

  const { data, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${state}`
  )
  console.log(data)

  //<div>{!data ? 'loading...' : data}</div>
  return (
    <>
      <div>
        {" "}
        {!loading}
        <div>Blog ID: {data.id}</div>
        <div>Title: {data.title}</div>
        <div>Body: {data.body}</div>
        <div>User ID: {data.userId}</div>
      </div>

      <button onClick={() => setstate(pre => pre - 1)}>-</button>
      <span>{state}</span>
      <button onClick={() => setstate(pre => pre + 1)}>+</button>
    </>
  )
}

export default Hooks
