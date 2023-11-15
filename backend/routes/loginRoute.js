const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Get log in user
// @access  Private
router.get("/", async (req, res) => {
  // try {
  //   const user = await User.findById(req.user.id).select('-password');
  //   res.json(user);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).sendStatus('Server Error');
  // }
});
