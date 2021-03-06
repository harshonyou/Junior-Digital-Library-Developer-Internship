import { useState, useEffect } from "react"

export const useTextFetch = url => {
  const [state, setstate] = useState(()=>({ data: null, loading: true }))
  useEffect(() => {
    setstate(()=>({ data: null, loading: true }))
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setstate({ data: y, loading: false })
      })
  }, [url])
  return state
};
