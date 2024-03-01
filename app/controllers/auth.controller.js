const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Client = db.client;
const Employe = db.employe;
const Manager = db.manager;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, savedUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

      if (req.body.Services) {
        Role.findOne({name: "moderator" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            savedUser.roles = [role._id];
            
              savedUser.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                const employe = new Employe({
                  Nom: req.body.Nom,
                  Prenom: req.body.Prenom,
                  Gender: req.body.Gender,
                  Phone: req.body.Phone,
                  Services : req.body.Services,
                  avatar : "https://ssl.gstatic.com/accounts/ui/avatar_2x.png",
                  User : savedUser._id,
                })
      
                employe.save((err, savedClient) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
          
                  res.send({ message: "User and employe were registered successfully!" });
                });
              });
        });
      } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        savedUser.roles = [role._id];
        savedUser.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          const client = new Client({
            Nom: req.body.Nom,
            Prenom: req.body.Prenom,
            Gender: req.body.Gender,
            Phone: req.body.Phone,
            avatar : "https://ssl.gstatic.com/accounts/ui/avatar_2x.png",
            User : savedUser._id,
          })

          client.save((err, savedClient) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            res.send({ message: "User and Client were registered successfully!" });
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user._id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token : token
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
