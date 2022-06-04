import React, { createContext, useState } from 'react'

export const TradersContext = createContext();

const TradersContextProvider = (props) => {
  const [traders, setTraders] = useState("")

  const updateTraders = () => {
    fetch("http://localhost:3000/traders", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res) => {
      if (res.ok) {
        console.log("traders response: ", res);
      }
      return res.json();
    })
    .then((data) => {
      console.log("traders data: ", data);
      setTraders(data)
    })
  }

  return (
    <TradersContext.Provider value={{traders, setTraders, updateTraders}}>
      { props.children }
    </TradersContext.Provider>
  )
}

export default TradersContextProvider