import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

function History() {
  const {userTransactions, setUserTransactions} = useContext(TransactionsContext)
  const [transactions, setTransactions] = useState(null)
  const [userType, setUserType] = useState()


  const onMount = useCallback(
    () => {
      fetch("http://localhost:3000/transactions", {
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
        // setTransactions(data)
        setUserTransactions(data)
      })
    },
    [userType],
  )
  

  

  useEffect(() => {
    setUserType(localStorage.getItem("user_type")) 
    console.log("mounted, user_type is : ", userType )
    onMount();
  }, [])

  return (
    <div className='basis-10/12 border-slate-800 border-2 overflow-y-scroll p-5'>

      <div className='basis-10/12 border-slate-800 border-2 rounded-md'>
        History / Transactions
        <table className='min-w-full'>
          <thead className='border-b'>
            <tr>
              {userType == "admin" && <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>User ID</th>}
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Transaction ID</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Transaction Type</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Ticker</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Share Price</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Count</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Gains</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Date</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
            {userTransactions && userTransactions.map((transaction) => (
              <tr key={transaction.id}>
                {userType == "admin" && <td>{transaction.user_id}</td>}
                <td>{transaction.id}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.stock.ticker}</td>
                <td>{transaction.share_price}</td>
                <td>{transaction.count}</td>
                {transaction.gains > 0 ? <td className='text-green-600'>{transaction.gains}</td> : <td className=''>{transaction.gains}</td>}
                <td>{transaction.created_at}</td>
                {transaction.transaction_type == "buy" ? <td className='text-red-600'> ( {transaction.total_amount} )</td> : <td className=''>  {transaction.total_amount}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History