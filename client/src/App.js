import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AvailabilityForm from "./components/AvailabilityForm";
import ScheduleForm from "./components/ScheduleForm";
import AddVehicleForm from "./components/AddVehicleForm";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/availability" element={<AvailabilityForm />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/addVehicle" element={<AddVehicleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
