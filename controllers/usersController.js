const db = require("../models");
const moment = require("moment");

// Defining methods for the booksController
module.exports = {

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .populate("foodEntries")
      .populate("waterEntries")
      .populate("weightEntries")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
    db.User
      .findOne({ email: req.body.email })
      .populate("foodEntries")
      .populate("waterEntries")
      .populate("weightEntries")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getSecret: function(req, res) {
      db.User
        .findOne({ email: "secret" })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findAndVerifyAccount: function(req, res) {
    //db.User.findOne({ email: req.body.email })
    db.User.findOne({email: req.body.email})
        .then(function(dbUser) {
            console.log(dbUser);
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
  findOne: function(req, res) {
        db.User
          .findOne({ email: req.body.email })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
  create: function(req, res) {
    db.User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  saveWeight: function(req, res) {
      db.WeightEntry
        .create({
            weight: req.body.weight
        })
        .then(function(dbWeightEntry) {
            return db.User.findOneAndUpdate({_id: req.body.userId}, 
                { $push: { weightEntries: dbWeightEntry._id } }, { new: true });
          })
          .then(function(dbUser) {
            // If we were able to successfully update a User, send it back to the client
            res.json(dbUser);
          })
          .catch(err => res.status(422).json(err));
  },
  saveWaterEntry: function(req, res) {
    db.WaterEntry
      .create({
          glassesOfWater: req.body.glassesOfWater
      })
      .then(function(dbWaterEntry) {
          return db.User.findOneAndUpdate({_id: req.body.userId}, 
              { $push: { waterEntries: dbWaterEntry._id } }, { new: true });
        })
        .then(function(dbUser) {
          // If we were able to successfully update a User, send it back to the client
          res.json(dbUser);
        })
        .catch(err => res.status(422).json(err));
  },
  saveFoodEntry: function(req, res) {
    db.FoodEntry
      .create({
        foodItem: req.body.foodItem,
        itemNumber: req.body.itemNumber,
        energy: req.body.energy,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        fiber: req.body.fiber,
        sugar: req.body.sugar
      })
      .then(function(dbFoodEntry) {
          return db.User.findOneAndUpdate({_id: req.body.userId}, 
              { $push: { foodEntries: dbFoodEntry._id } }, { new: true });
        })
        .then(function(dbUser) {
          // If we were able to successfully update a User, send it back to the client
          res.json(dbUser);
        })
        .catch(err => res.status(422).json(err));
  },
  getWeightEntries: function(req, res) {
    //console.log("here: " + req.body.id);
    //db.User.findById(req.body.id)
    db.User.findById(req.params.id)
    // ..and populate all of the weight entries associated with it
        .populate("weightEntries")
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    getWaterEntries: function(req, res) {
    // console.log("here: " + req.body.id);
    // db.User.findById(req.body.id)
    db.User.findById(req.params.id)
    // ..and populate all of the water entries associated with it
        .populate("waterEntries")
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    getFoodEntries: function(req, res) {
        db.User.findById(req.params.id)
        // ..and populate all of the food entries associated with it
            .populate("foodEntries")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    }
};