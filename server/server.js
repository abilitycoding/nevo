const express = require("express");
const sequelize = require("./config/database"); // Ensure this is correctly imported
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

// CORS configuration to allow requests from http://localhost:3000 with credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Use body-parser middleware for parsing JSON and urlencoded data
app.use(bodyParser.json()); // to parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8000;

const Vehicle = require("./models/Vehicle");

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connected...");
    await sequelize.sync({ force: false }); // Don't force reset to keep existing data
    console.log("Database synced...");

    // Conditional seeding logic
    const vehicleCount = await Vehicle.count();

    if (vehicleCount === 0) {
      // Insert sample vehicles only if the database is empty
      await Vehicle.bulkCreate([
        {
          id: "001",
          vehicleType: "Volkswagen ID.4",
          location: "Dublin",
          startDateTime: new Date("2023-11-01T09:00:00Z"),
          durationMins: 45,
          isAvailable: false
        },
        {
          id: "002",
          vehicleType: "Tesla Model 3",
          location: "Dublin",
          startDateTime: new Date("2023-11-01T10:00:00Z"),
          durationMins: 45,
          isAvailable: true
        },
        {
          id: "003",
          vehicleType: "Nissan Leaf",
          location: "Dublin",
          startDateTime: new Date("2023-11-01T09:00:00Z"),
          durationMins: 60,
          isAvailable: true
        },
        {
          id: "004",
          vehicleType: "BMW i3",
          location: "Cork",
          startDateTime: new Date("2023-11-02T11:00:00Z"),
          durationMins: 30,
          isAvailable: true
        },
        {
          id: "005",
          vehicleType: "Chevrolet Bolt EV",
          location: "Cork",
          startDateTime: new Date("2023-11-03T12:00:00Z"),
          durationMins: 50,
          isAvailable: false
        },
        {
          id: "006",
          vehicleType: "Audi e-tron",
          location: "Galway",
          startDateTime: new Date("2023-11-04T13:00:00Z"),
          durationMins: 40,
          isAvailable: true
        },
        {
          id: "007",
          vehicleType: "Hyundai Kona Electric",
          location: "Galway",
          startDateTime: new Date("2023-11-05T14:00:00Z"),
          durationMins: 55,
          isAvailable: false
        },
        {
          id: "008",
          vehicleType: "Jaguar I-PACE",
          location: "Limerick",
          startDateTime: new Date("2023-11-06T15:00:00Z"),
          durationMins: 45,
          isAvailable: true
        },
        {
          id: "009",
          vehicleType: "Kia Soul EV",
          location: "Limerick",
          startDateTime: new Date("2023-11-07T16:00:00Z"),
          durationMins: 35,
          isAvailable: true
        },
        {
          id: "010",
          vehicleType: "Mercedes-Benz EQC",
          location: "Waterford",
          startDateTime: new Date("2023-11-08T17:00:00Z"),
          durationMins: 50,
          isAvailable: true
        }
      ]);

      console.log("Sample vehicles added...");
    } else {
      console.log(
        "Vehicles already exist in the database. No need to add sample data."
      );
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
