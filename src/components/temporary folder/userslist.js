import React, { useEffect, useState } from 'react'

function Userslist() {
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    const onMount = async () => {
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
        setUsersList(data)
      })
    }
  
    onMount();
  }, [])


  return (
    <>
      <h3>Users List</h3>
      <div>
        {
          usersList.map((user) => (
            <div key={user.id}>
              {user.email}
            </div>
            
          ))
        }
      </div>
    </>
  )
}

export default Userslist