const express = require("express");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
var http = require("http").createServer(app);
const chatPort = 8080;
var io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
//app.use(express.urlencoded({ extended: true }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const secureRoute = require("./routes/secure-routes");
// Routes
app.use("/", require("./routes/index.js"));
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

app.use("/users", require("./routes/users.js"));

app.get("/test", (req, res) =>
  res.send({
    message: "hello",
  })
);

const STATIC_CHANNELS = ["global_notifications", "global_chat"];
http.listen(chatPort, () => {
  console.log(`listening on *:${chatPort}`);
});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */

  console.log("new client connected");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

const PORT = process.envPORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
