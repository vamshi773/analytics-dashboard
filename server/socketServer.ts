import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 4000;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.emit("system_alert", { message: "Connected to live feed ✅" });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Simulate events every 5 seconds
setInterval(() => {
  io.emit("new_sale", {
    amount: Math.floor(Math.random() * 900) + 50,
    time: new Date().toISOString(),
  });

  io.emit("order_updated", {
    orderId: Math.random().toString(16).slice(2, 10),
    status: ["Pending", "Completed", "Cancelled"][Math.floor(Math.random() * 3)],
    time: new Date().toISOString(),
  });

  io.emit("user_registered", {
    name: ["Sandeep", "Vamshi", "Sai", "Kiran"][Math.floor(Math.random() * 4)],
    time: new Date().toISOString(),
  });
}, 5000);

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
