import StockCard from "components/StockCard";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const StockList = [
  { symbol: "AAPL", price: 150.45 },
  { symbol: "GOOG", price: 2200.1 },
  { symbol: "GOOG", price: 2200.1 },
  { symbol: "GOOG", price: 2200.1 },
];


export async function getStaticProps() {
  const stocks =  fetch("data/stocks.json");
 
  return { props: {  } };
}

function Stocks({stocks}) {

    const socket = io("http://localhost:3000/", { path: "/api/socketio" });


    useEffect(() => {
      socket.on("connect", () => {
        console.log("socket server connected.");
      });
      socket.on("disconnect", () => {
        console.log("socket server disconnected.");
      });
    }, []);


  return (
    <div className="max-auto max-w-screen p-4 h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {StockList.map(({symbol,price}, i)=> {
            return <StockCard key={i}  price={price} symbol={symbol}/>;
        })}
        
       
      </div>
     
    </div>
  );
}

export default Stocks;
