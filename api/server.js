const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const ideasRouter = require("./routes/ideas");
const usersRouter = require("./routes/users");

connectDB();

const app = express();

// static folder
app.use(express.static(path.join(__dirname, "../public")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cors middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}));

app.use("/api/users", usersRouter);
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`server listening on port: ${port}`));
