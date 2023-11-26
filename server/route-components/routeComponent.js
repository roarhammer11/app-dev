const express = require("express");
const router = express.Router();
const accountController = require("../controller-components/accountControllerComponent");
// const scheduleController = require("../controller-components/scheduleControllerComponent");
// const appointmentController = require("../controller-components/appointmentControllerComponent");
router.post("/login", accountController.login);
//Accounts
router.post("/addAccount", accountController.create);
// router.post("/retrieveAccounts", accountController.retrieveAccounts);
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