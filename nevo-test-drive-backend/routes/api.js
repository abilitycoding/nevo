const express = require("express");
const {
  checkAvailability,
  scheduleTestDrive,
  addVehicle,
  getAllVehicles,
  clearBooking, 
} = require("../controllers/vehicleController");

const router = express.Router();

router.get("/availability", checkAvailability);
router.post("/schedule", scheduleTestDrive);
router.post("/addVehicle", addVehicle);
router.get("/vehicles", getAllVehicles);
router.put("/vehicles/:id/clearBooking", clearBooking); 

module.exports = router;
