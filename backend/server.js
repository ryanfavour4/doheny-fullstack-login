const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const session = require("express-session")
const passport = require("passport")
const app = express()


dotenv.config()
const client = require("./dbConfig.js")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require("./passport.js")(passport)

app.post("/register", (req, res, next) => {
  const { email, password } = req.body
  client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, password], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Server error")
    } else {
      res.status(200).send("User created")
    }
  })
})



app.post("/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user })
  })







app.listen(3000, () => console.log("Listening on port 3000"));