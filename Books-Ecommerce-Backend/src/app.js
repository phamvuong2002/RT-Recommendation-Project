require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const {
  app: { session_key, session_name, session_db },
} = require("./v1/configs/config");
const { connectProducer } = require("./v1/dbs/init.kafka");

//init middlewares
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: process.env.DATABASE_CONNECTION_STRING,
  collection: session_db,
});

//set headers for sending payload
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//init session
app.use(
  session({
    secret: session_key,
    name: session_name, // cookies name to be put in "key" field in postman
    store: mongoDBstore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //5 * 60 * 1000, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
      sameSite: true,
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: true,
  })
);

//init db
require("./v1/dbs/init.mongo");
//cron-jobs
require("./v1/cron-jobs/resetVerifyNumFirebase");

/* Kafka */
// Connect Kafka producer when the server starts
connectProducer()
  .then(() => {
    console.log("Producer connected to Kafka");
  })
  .catch((error) => {
    console.error("Error connecting to Kafka:", error);
    process.exit(1);
  });

//init routes
app.use("/", require("./v1/routes"));

//handling errors
app.use((req, res, next) => {
  const error = new Error("Service Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
