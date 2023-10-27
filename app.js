const express= require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride= require('method-override');
const path= require("path");
const {connectDB}= require("./data/database");
const session = require("express-session");
const passport = require("passport");
const MongoStore= require("connect-mongo");
const flash = require("express-flash");

require('dotenv').config();

const app= express();
const PORT= 4000 || process.env.PORT;

app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URL,
      dbName: "Notes",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"))

connectDB();

app.use(express.static(path.join(path.resolve(),"public")));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.use("/", require("./routes/dashboard"));

app.get("*", (req,res)=>{
    res.status(404).render("error");
})

app.listen(PORT, ()=>{
    console.log(` Server is running on Port: ${PORT}`)
});