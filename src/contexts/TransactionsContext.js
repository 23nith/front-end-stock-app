import React, { createContext, useState } from 'react'

export const TransactionsContext = createContext();

const TransactionsContextProvider = (props) => {
  const [userTransactions, setUserTransactions] = useState()

  return (
    <TransactionsContext.Provider value={{userTransactions, setUserTransactions}}>
      { props.children }
    </TransactionsContext.Provider>
  )
}

export default TransactionsContextProvider