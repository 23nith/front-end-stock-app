import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState()

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      { props.children }
    </UserContext.Provider>
  )
}

export default UserContextProvider