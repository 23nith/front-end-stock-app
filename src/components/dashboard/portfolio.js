import { isFocusable } from '@testing-library/user-event/dist/utils'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { StocksContext } from '../../contexts/StocksContext'
import { UserContext } from '../../contexts/UserContext'

function Portfolio() {
  const {userStocks, setUserStocks} = useContext(StocksContext)
  const {currentUser} = useContext(UserContext)
  const history = useHistory();

  useEffect(()=>{
    if(currentUser.role == "admin"){
      history.push("/front-end-stock-app/management")
    }
  }, [currentUser])

  useEffect(() => {
    const onMount = async () => {
      fetch("http://localhost:3000/stocks", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.ok) {
        }
        return res.json();
      })
      .then((data) => {
        setUserStocks(data);
      })
    }
  
    if(currentUser.role == "admin"){
      history.push("/front-end-stock-app/management")
    }else{
      onMount();
    }
  }, [])

  return (
    <div className='basis-10/12 border-slate-800 border-2 flex justify-center items-start pt-5'>
      <div className='w-4/5 border-slate-800 border-2 rounded-md'>
        Portfolio
        <table className='min-w-full'>
          <thead className='border-b'>
            <tr>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Ticker</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Investment Value</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Shares Owned</th>
              {/* <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Latest Price</th> */}
            </tr>
          </thead>
          <tbody>
            {userStocks && userStocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.ticker}</td>
                <td>{stock.investment_value}</td>
                <td>{stock.shares_owned}</td>
                {/* <td>{stock.latest_price}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Portfolio