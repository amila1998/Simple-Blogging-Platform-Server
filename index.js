require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 6010;

// Import database connection
require("./db/conn");

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://jazzy-sawine-45922a.netlify.app'],
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set trust proxy for secure cookies
app.set("trust proxy", 1);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to sample blogging platform server");
});

const userRoutes = require("./Routers/userRouter");
app.use(userRoutes);

app.use('/api', require('./Routers/upload'))

const postRoutes = require("./Routers/postRouter");
app.use(postRoutes);

// HTTP request logger
app.listen(PORT, () => {
    console.log(`Server is starting at ${PORT}`);
});