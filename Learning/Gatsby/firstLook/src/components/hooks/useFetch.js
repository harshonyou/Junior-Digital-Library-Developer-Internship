import { useState, useEffect } from "react"

export const useFetch = url => {
  const [state, setstate] = useState(()=>({ data: {'userId': null, 'id': null, 'title': null, 'body': null}, loading: true }))
    // console.log("Me too")
  useEffect(() => {
    //  setstate(pre => ({ data: pre.data, loading: true }))
    fetch(url)
      .then(x => x.json())
      .then(y => {
        setstate({ data: y, loading: false })
        // console.log("I did the work")
      })
    // console.log("Im working my best")
  }, [url])
  // console.log(state)
  return state
};
