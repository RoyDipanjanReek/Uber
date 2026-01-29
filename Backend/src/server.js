import http from "http";
import app from "./app.js";
import { initializedSocket } from "./socket.js";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

initializedSocket(server)

server.on('error', (error) => {
  if (error.code === 'EACCES') {
    console.error(`Port ${port} requires elevated privileges.`)
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
