const Vehicle = require("../models/Vehicle");

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { id, vehicleType, location, startDateTime, durationMins } = req.body;

    const newVehicle = await Vehicle.create({
      id,
      vehicleType,
      location,
      startDateTime: new Date(startDateTime),
      durationMins,
      isAvailable: true
    });

    res
      .status(201)
      .json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check vehicle availability
exports.checkAvailability = async (req, res) => {
  try {
    const requiredFields = [
      { key: "location", value: req.query.location },
      { key: "vehicleType", value: req.query.vehicleType },
      { key: "startDateTime", value: req.query.startDateTime },
      { key: "durationMins", value: req.query.durationMins }
    ];

    // Validate that all required fields are provided
    for (let field of requiredFields) {
      if (!field.value) {
        return res.status(400).json({
          message: `${field.key} is required.`
        });
      }
    }

    console.log("Request data:", {
      location: req.query.location,
      vehicleType: req.query.vehicleType,
      startDateTime: req.query.startDateTime,
      durationMins: req.query.durationMins
    });

    const vehicle = await Vehicle.findOne({
      where: {
        location: req.query.location,
        vehicleType: req.query.vehicleType,
        startDateTime: req.query.startDateTime,
        isAvailable: true
      }
    });

    if (!vehicle) {
      return res
        .status(404)
        .json({ message: "No vehicle available for the requested time." });
    }

    res.status(200).json({ message: "success", vehicleId: vehicle.id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Schedule a test drive
exports.scheduleTestDrive = async (req, res) => {
  try {
    const {
      vehicleId,
      startDateTime,
      durationMins,
      customerName,
      customerPhone,
      customerEmail
    } = req.body;

    // Array of required fields
    const requiredFields = [
      { key: "vehicleId", value: vehicleId },
      { key: "startDateTime", value: startDateTime },
      { key: "durationMins", value: durationMins },
      { key: "customerName", value: customerName },
      { key: "customerPhone", value: customerPhone },
      { key: "customerEmail", value: customerEmail }
    ];

    // Validate that all required fields are provided
    for (let field of requiredFields) {
      if (!field.value) {
        return res.status(400).json({
          message: `${field.key} is required.`
        });
      }
    }

    console.log(req.body);

    const vehicle = await Vehicle.findOne({
      where: { id: vehicleId, isAvailable: true }
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not available" });
    }

    // Schedule the vehicle (updating the availability status)
    vehicle.isAvailable = false;
    await vehicle.save();

    res.status(201).json({
      vehicleId,
      startDateTime,
      durationMins,
      customerName,
      customerPhone,
      customerEmail
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Clear booking for a vehicle
exports.clearBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findOne({ where: { id } });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.isAvailable = true;
    await vehicle.save();

    res.status(200).json({ message: "Booking cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
