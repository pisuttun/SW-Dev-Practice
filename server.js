const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express VacQ API",
        },
        servers: [
            {
                url: "http://localhost:5000/api/v1",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

//Rate Limiting
const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, //10 mins
    max: 100,
});
app.use(limiter);

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
