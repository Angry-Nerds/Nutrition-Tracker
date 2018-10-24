const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/login"
router.route("/login")
  .get(usersController.findAccount);

// Matches with "/api/users/signup"
router.route("/signup")
  .post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(usersController.findById);
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;