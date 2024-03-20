// pages/api/socketio.ts


import { Server } from "socket.io";
import fs from "fs";


const socketioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {

    const io = new Server(res.socket.server, { path: "/api/socketio" });
    // socket connection initialisation
    io.on("connection", (socket) => {
      console.log("User connected succesfully");

      // sends message to clients with the update stock prices. also updates stock history prices 
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


      // listens to update messgae to save the new prices to the directory
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
