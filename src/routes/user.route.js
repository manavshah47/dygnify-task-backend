const express = require("express");
const router = express.Router()
const { userController } = require("../controller");

// 1. Post route for updating user info
router.post("/create-user", userController.createUser)

// 2. post request for creating business
router.post("/create-business/:userId", userController.createBusiness)

// 3. post request for creating loan
router.post("/create-loan/:businessId", userController.createLoan)

// 4. get request for all users data
router.get("/get-all-users", userController.getAllUsers)

// 5. get request for all business data
router.get("/get-all-business", userController.getAllBusiness)

// 6. get request for all loan data
router.get("/get-all-loan", userController.getAllLoan)

module.exports = router;
