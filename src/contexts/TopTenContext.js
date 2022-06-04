import React, { createContext, useState } from 'react'

export const TopTenContext = createContext();

const TopTenContextProvider = (props) => {
  const [topTen, setTopTen] = useState()

  return (
    <TopTenContext.Provider value={{topTen, setTopTen}}>
      { props.children }
    </TopTenContext.Provider>
  )
}

export default TopTenContextProvider