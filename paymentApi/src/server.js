const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");

const app = express();
const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());
app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../certs/localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../certs/localhost.pem")),
};

const PORT = 5000;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});