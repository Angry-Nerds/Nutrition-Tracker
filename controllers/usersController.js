const db = require("../models");

// Defining methods for the booksController
module.exports = {
//   findAll: function(req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .populate("foodEntries")
      .populate("waterEntries")
      .populate("weightEntries")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAccount: function(req, res) {
    db.User.findOne({ email: req.body.email })
        .then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
            console.log(req.body.email);
            console.log("incorrect email");
             res.json({
                 message: "Incorrect email."
            });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (dbUser.password != req.body.password) {
            console.log("incorrect password");
            res.json({
                message: "Incorrect password."
            });
        }
        else {
            // If none of the above, return the user
            console.log("found user");
            res.json({
                user: dbUser
            });
        }
    });
  },
  create: function(req, res) {
    db.User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  }
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};