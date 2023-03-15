const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/hospitals", require("./routes/hospitals"));
app.use("/api/v1/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
