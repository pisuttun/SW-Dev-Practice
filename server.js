const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/hospitals", require("./routes/hospitals"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
