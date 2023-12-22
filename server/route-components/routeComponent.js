const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage(); // You can also set up disk storage
const upload = multer({
  storage: storage,
  limits: {fileSize: 50000000},
});
const router = express.Router();
const accountController = require("../controller-components/accountControllerComponent");
const foodController = require("../controller-components/foodControllerComponent");
// const appointmentController = require("../controller-components/appointmentControllerComponent");
router.post("/login", accountController.login);
//Accounts
router.post("/signup", accountController.signup);
router.post("/addFood", upload.single("image"), foodController.addFood);
router.post("/getFoodsByOwner", foodController.getFoodsByOwner);
router.get("/getAllFoods", foodController.getAllFoods);

// router.patch("/disableAccount", accountController.disableAccount);
// router.patch("/updateAccount", accountController.updateAccount);
// router.post("/retrieveAccountById", accountController.findById);
//Schedules
// router.post("/addSchedule", scheduleController.addSchedule);
// router.post("/retrieveSchedules", scheduleController.retrieveSchedules);
// router.post("/retrieveScheduleById", scheduleController.findById);
// router.post("/deleteSchedule", scheduleController.deleteSchedule);
// //Appointment
// router.post("/createAppointment", appointmentController.createAppointment);
// router.patch("/approveAppointment", appointmentController.approveAppointment);
// router.get(
//   "/retrieveAllAppointments",
//   appointmentController.retrieveAllAppointments
// );
// router.post(
//   "/retrieveAppointmentsById",
//   appointmentController.retrieveAppointmentsById
// );
// router.post(
//   "/cancelAppointment",
//   appointmentController.cancelAppointment
// );
module.exports = router;
