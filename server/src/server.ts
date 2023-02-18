import http from "http";

import app from "./app";

const server = http.createServer(app);

server.listen(3000, () => console.log("listening on http://localhost:3000"));
