const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  signout,
  details,
  send,
  edit,
} = require("../controllers/provider");
const { authenticatePro } = require("../middleware/authenticate");

/**Post Method */

router.route("/signup").post(signup);
router.route("/signin").post(signin);

//Authentication

router.route("/details").post(authenticatePro, details);
router.route("/signout").get(authenticatePro, signout);
router.route("/send").post(authenticatePro, send);
router.route("/edit").put(edit);

module.exports = router;
