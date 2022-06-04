import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { StocksContext } from '../../../contexts/StocksContext';

ChartJS.register(ArcElement, Tooltip, Legend);
// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


function Chart() {
  const [stocks, setStocks] = useState([])
  const {userStocks, setUserStocks} = useContext(StocksContext);
  const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'])
  const [stockCount, setStockCount] = useState([12, 19, 3, 5, 2, 3])

  const onMount =  useCallback(() =>{
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
      console.log("data: ", data);
      setStocks(data);
      if(data = {Note: 'Thank you for using Alpha Vantage! Our standard AP…would like to target a higher API call frequency.'}){
        console.log("5 calls per minute limit.")
      }else{
        setUserStocks(data);
      }
    })
  }, [userStocks])

  useEffect(() => {  
    onMount();
  }, [])

  useEffect(()=>{
    if(userStocks){
      let labels = userStocks.map(stock => {
        return stock.ticker;
      });
      setLabels(labels)
  
      let stockCount = userStocks.map(stock => {
        return stock.shares_owned;
      });
  
      setStockCount(stockCount)
    }

  }, [userStocks])

  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    labels: [...labels],
    datasets: [
      {
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: [...stockCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='basis-1/4 border-slate-800 border-2 flex flex-col justify-center items-center'>
      Portfolio Chart
      <div style={{height: "80%", width: "80%"}}>
        <Pie data={data}/>
      </div>
    </div>
  )
}

export default Chart