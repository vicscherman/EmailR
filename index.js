const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require('body-parser')
//make sure the model is imported before the passport service is used.....
require("./models/User");
require("./models/Survey")
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
//wiring up middleware 
app.use(bodyParser.json())


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app)

//code only runs in production environment
if(process.env.NODE_ENV === 'production'){
  //first express checks if there's a specific file that matches up with request
  //express serves up production assests
  //like main.js or main.css files
  app.use(express.static('client/build'))

  //if there isn't a match in authRoutes,Billing routes, or client/build it uses the below route handler
  //express will serve up the index.html file
  const path = require('path')
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


//remember that the localhost redirect for development command is npx ngrok http 5000. You'll have to manually set this endpoint in sendgrid