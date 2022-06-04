import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Stocksquery from './stocksquery'
import Userslist from './userslist'

function Dashboard() {
  const [role, setRole] = useState("")

  useEffect(() => {
    const onMount = async () => {
      fetch("http://localhost:3000/current_user", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.ok) {
          console.log("response: ", res);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data.role);
        setRole(data.role)
      })
    }
  
    onMount();
  }, [])
  

  return (
    <>
      { role == "user" && <div>Welcome user</div>}
      { role == "admin" && <div>Welcome admin</div>}
      <Link to="/">Go back</Link>
      { role == "admin" && <Userslist/> }
      { role == "user" && <Stocksquery/>}
    </>
  )
}

export default Dashboard