const express = require("express");

const app = express();
const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
