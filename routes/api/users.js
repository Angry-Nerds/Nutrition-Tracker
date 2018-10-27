const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/login"
router.route("/login")
  .get(usersController.findOne);

// Matches with "/api/users/signup"
router.route("/signup")
  .post(usersController.create)
  .get(usersController.findByEmail);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(usersController.findById);
//   .put(booksController.update)
//   .delete(booksController.remove);

// Matches with "/api/users/food"
router.route("/food")
  .post(usersController.saveFoodEntry);

// Matches with "/api/users/water"
router.route("/water")
  .post(usersController.saveWaterEntry);

// Matches with "/api/users/weight"
router.route("/weight")
  .post(usersController.saveWeight);

router.route("/weight/history")
  .post(usersController.getWeightEntries);

router.route("/water/history")
  .post(usersController.getWaterEntries);

router.route("/food/history")
  .post(usersController.getFoodEntries);

module.exports = router;