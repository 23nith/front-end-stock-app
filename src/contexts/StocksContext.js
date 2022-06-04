import React, { createContext, useState } from 'react'

export const StocksContext = createContext();

const StocksContextProvider = (props) => {
  const [userStocks, setUserStocks] = useState();

  const fetchUserStocks = (message) => {
    console.log(message);
    fetch("http://localhost:3000/stocks", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.ok) {
          // console.log("response: ", res);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("data: ", data);
        setUserStocks(data);
      })
    console.log("updated userStocks")
  }

  return (
    <StocksContext.Provider value={{userStocks, setUserStocks, fetchUserStocks}}>
      { props.children }
    </StocksContext.Provider>
  )
}

export default StocksContextProvider