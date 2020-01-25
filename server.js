const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

//Init bodyparser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUNNING"));
app.use("/api/user", require("./backend/routes/users"));
// app.use("/api/profile", require("./backend/routes/profiles"));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
