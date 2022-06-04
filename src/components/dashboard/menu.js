import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Menu({setShowLogin}) {
  const [role, setRole] = useState("")
  // const {currentUser, setCurrentUser} = useContext(UserContext)

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

  const handleOnSignOut = () => {
    setShowLogin(true);
  }
  return (
    <div className='basis-2/12 border-slate-800 border-2 '>
      Menu

      {role == "admin" && <div><br/><h1>Welcome Admin</h1></div>}

      <div className='mt-20 flex flex-col'>
        
        {role == "user" && <div className='my-3.5'>
          <button>
          <Link to="/front-end-stock-app/" >Dashboard</Link>
          </button>
        </div>}

        {role == "user" && <div className='my-3.5'>
          <button>
            <Link to="/front-end-stock-app/portfolio" >Portfolio</Link>
          </button>
        </div>}

        {role == "user" && <div className='my-3.5'>
          <button>
            <Link to="/front-end-stock-app/discover" >Buy/Sell</Link>
          </button>
        </div>}

        <div className='my-3.5'>
          <button>
            <Link to="/front-end-stock-app/history" >Transaction History</Link>
          </button>
        </div>

        { role == "admin" && <div className='my-3.5'>
          <button>
            <Link to="/front-end-stock-app/management" >Account Management</Link>
          </button>
        </div>}

        <div className='my-3.5'>
          <button onClick={handleOnSignOut}>
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}

export default Menu