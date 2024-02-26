const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');

const dbConfig = require("./app/config/db.config");

const servicesroutes = require('./app/routes/serviceRoutes')
const etatsroutes = require('./app/routes/etatRoutes')
const clientsroutes = require('./app/routes/client.routes')


const app = express();

const corsOptions = {
  // origin: ['http://localhost:4200'], // Remplacez par votre domaine autorisé
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  // credentials: true 
};

// app.use(cors())

// app.use(cors({
//   origin: ['http://localhost:4200'],
//   credentials: true 
// }));

app.use(cors(corsOptions));

app.use('/service',servicesroutes).use('/',etatsroutes).use('/client',clientsroutes)

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models"); 
const Role = db.role;
db.mongoose
  .connect('mongodb+srv://ravelonarivojovani:MYmeanproject10@jovani0.bcg1atj.mongodb.net/mean?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const directory = path.join(__dirname, './app/public');
app.use("/public", express.static(directory));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin" 
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
