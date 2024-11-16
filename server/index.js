const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const userRoute = require("./routes/auth");
const carRoute = require("./routes/car");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const app = express();

const PORT = process.env.PORT || 5000;

require("dotenv").config();

database.connect();

app.use(cors({
    origin: "*",
    credentials: true,
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
}));

app.use("/api/docs",userRoute);
app.use("/api/docs",carRoute);
cloudinaryConnect();
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
})

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});