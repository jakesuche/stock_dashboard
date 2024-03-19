// pages/api/socketio.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import fs from "fs";
import data from "data/stock.prices.json";

const socketioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {




    const io = new Server(res.socket.server, { path: "/api/socketio" });
    // socket connection initialisation
    io.on("connection", (socket) => {
      console.log("User connected succesfully");

      socket.on("hello", (arg, callback) => {
        callback(arg);
      });

      socket.on("sendmsg", (msg) => {
        io.emit("receivemsg", msg);
      });

      

      // setInterval(() => {
        
      //    const jsonDataSync = fs.readFileSync("src/data/stocks.json", "utf8");
      //    const StockList = JSON.parse(jsonDataSync) as Stock[];
        
       
      //   const updatedStock = StockList.map((item) => ({
      //     ...item,
      //     time_histories:[...item.time_histories || [], {timestamp:new Date(), price:item.price}],
      //     price: (Math.random() * 1000).toFixed(2),
      //   }));
      //   socket.emit("update", updatedStock);
      // }, 10000);

      setInterval(() => {
        fs.readFile("src/data/stocks.json", "utf8", (err, data) => {
          if (err) {
            console.error("Error reading JSON file:", err);
            return;
          }

          const StockList = JSON.parse(data) as Stock[];

          const updatedStock = StockList.map((item) => ({
            ...item,
            time_histories: [
              ...(item.time_histories?.slice(0,6) || []),
              { timestamp: new Date(), price: item.price },
            ],
            price: (Math.random() * 1000).toFixed(2),
          }));

          socket.emit("update", updatedStock);
        });
      }, 10000);

      socket.on("updated", (res) => {
        const jsonData = JSON.stringify(res, null, 2);
        fs.writeFile("src/data/stocks.json", jsonData, "utf8", (err) => {
          if (err) {
            console.error("Error writing JSON file:", err);
          } else {
            console.log("JSON file has been saved.");
          }
        });
      });

      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default socketioHandler;
