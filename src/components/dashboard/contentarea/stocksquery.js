import React, { useCallback, useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

function Stocksquery() {
  const [stockChartXValues, setStockChartXValues] = useState([])
  const [stockChartYValues, setStockChartYValues] = useState([])
  const [symbol, setSymbol] = useState("");
  const [chartLabel, setChartLabel] = useState("AMZN")

  const fetchStock = useCallback(async (StockSymbol) =>  {
    const API_KEY = '19JF4522MI6LKDM0';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_CALL)
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log(data);
        const xValues = [];
        const yValues = [];
        for(var key in data['Time Series (Daily)']){
          xValues.push(key);
          yValues.push(data['Time Series (Daily)'][key]['1. open']);
        }
        setStockChartXValues(xValues);
        setStockChartYValues(yValues);
      })
  }, [symbol]);

  useEffect(() => {
    const initialSymbol = 'AMZN'
    fetchStock(initialSymbol);
    
  }, [])
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetchStock(symbol);
    setChartLabel(symbol)
    setSymbol("")
  }

  return (
    <div className='basis-3/4 border-slate-800 border-2 flex flex-col justify-center items-center'>
      <div>Stocksquery</div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-26' type="text" name="symbol" value={symbol} onChange={(e)=>{setSymbol(e.target.value)}} />
          <input type="submit" value="search" />
        </form>
      </div>
      <div>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'green'},
            },
          ]}
          layout={ {width: 720, height: 440, title: chartLabel} }
        />
      </div>
      
    </div>
  )
}

export default Stocksquery