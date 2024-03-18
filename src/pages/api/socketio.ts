// pages/api/socketio.ts
import { Server } from "socket.io";

const socketioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, { path: "/api/socketio" });

    io.on("connection", (socket) => {
      console.log("User connected succesfully");

      socket.on("hello", (arg, callback) => {
        callback(arg);
      });

      socket.on("sendmsg", (msg) => {
        io.emit("receivemsg", msg);
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
