const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const profile = require("./backend/models/Profile");
app.use(express.json({ extended: false }));
connectDB();

app.get("/", (req, res) => res.send("API RUNNING"));
app.use("/api/user", require("./backend/routes/user"));
app.use("/api/profile", require("./backend/routes/profile"));
app.use("/api/login", require("./backend/routes/login"));
app.use("/api/post", require("./backend/routes/post"));
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
