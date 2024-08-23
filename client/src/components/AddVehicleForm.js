import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    vehicleType: "",
    location: "",
    startDateTime: "",
    durationMins: ""
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addVehicle",
        formData
      );
      setResponseMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
      setResponseMessage(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Add a New Vehicle</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {responseMessage && (
              <Alert variant="success">{responseMessage}</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="id">
                <Form.Label>Vehicle ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Enter vehicle ID"
                  required
                />
              </Form.Group>
              <Form.Group controlId="vehicleType" className="mt-3">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder="Enter vehicle type"
                  required
                />
              </Form.Group>
              <Form.Group controlId="location" className="mt-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </Form.Group>
              <Form.Group controlId="startDateTime" className="mt-3">
                <Form.Label>Start DateTime</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startDateTime"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="durationMins" className="mt-3">
                <Form.Label>Duration (Minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="durationMins"
                  value={formData.durationMins}
                  onChange={handleChange}
                  placeholder="Enter duration in minutes"
                  required
                />
              </Form.Group>
              <Button type="submit" className="mt-4 w-100" variant="primary">
                Add Vehicle
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVehicleForm;

/* 
  {
    id: "011",
    vehicleType: "Porsche Taycan",
    location: "Dublin",
    startDateTime: new Date("2023-11-09T09:00:00Z"),
    durationMins: 60,
    isAvailable: true
  },
  {
    id: "012",
    vehicleType: "Ford Mustang Mach-E",
    location: "Cork",
    startDateTime: new Date("2023-11-10T10:30:00Z"),
    durationMins: 45,
    isAvailable: true
  },
  {
    id: "013",
    vehicleType: "Polestar 2",
    location: "Galway",
    startDateTime: new Date("2023-11-11T11:00:00Z"),
    durationMins: 40,
    isAvailable: true
  },
  {
    id: "014",
    vehicleType: "Mini Cooper SE",
    location: "Limerick",
    startDateTime: new Date("2023-11-12T13:30:00Z"),
    durationMins: 50,
    isAvailable: true
  },
  {
    id: "015",
    vehicleType: "Volvo XC40 Recharge",
    location: "Waterford",
    startDateTime: new Date("2023-11-13T14:00:00Z"),
    durationMins: 55,
    isAvailable: true
  } */