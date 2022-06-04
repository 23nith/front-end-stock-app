import React, { createContext, useState } from 'react'

export const GraphContext = createContext();

const GraphContextProvider = (props) => {
  const [stockChartXValues, setStockChartXValues] = useState("")
  const [stockChartYValues, setStockChartYValues] = useState("")
  const [symbol, setSymbol] = useState("");
  const [chartLabel, setChartLabel] = useState("AMZN")

  const fetchStocks = (StockSymbol) => {
    const API_KEY = '19JF4522MI6LKDM0';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_CALL)
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log(data);
        // if(data = {Note: 'Thank you for using Alpha Vantage! Our standard AP…would like to target a higher API call frequency.'}){
        //   console.log("5 calls per minute limit.")
        // }else{
          const xValues = [];
          const yValues = [];
          for(var key in data['Time Series (Daily)']){
            xValues.push(key);
            yValues.push(data['Time Series (Daily)'][key]['1. open']);
          }
          setStockChartXValues(xValues);
          setStockChartYValues(yValues);
        // }
      })
  }

  return (
    <GraphContext.Provider value={{stockChartXValues, setStockChartXValues, stockChartYValues, setStockChartYValues, symbol, setSymbol, chartLabel, setChartLabel, fetchStocks}}>
      { props.children }
    </GraphContext.Provider>
  )
}

export default GraphContextProvider