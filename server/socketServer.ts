import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  const sendData = () => {
    socket.emit("analytics:update", {
      revenue: Math.floor(Math.random() * 10000),
      users: Math.floor(Math.random() * 500),
      orders: Math.floor(Math.random() * 100),
    });
  };

  const interval = setInterval(sendData, 5000);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    clearInterval(interval);
  });
});

// ✅ CHANGE PORT HERE
const PORT = 4001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});