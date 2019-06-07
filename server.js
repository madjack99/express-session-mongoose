const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const db = require("./config/keys").mongoURI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err));

app.use(
  session({
    name: "MY_SESSION",
    secret: "MY_SECRET",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      secure: false
    }
  })
);

app.use("/api/users", require("./routes/users"));

app.get("/home", (req, res) => {
  console.log("/home\n", req.session);
  res.send(`
    <h1>This is homepage</h1>
    <form action="/api/users/logout" method="post">
      <button>Logout</button>
    </form>
  `);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
