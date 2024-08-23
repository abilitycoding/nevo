import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const AvailabilityForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    vehicleType: "",
    startDateTime: "",
    durationMins: ""
  });
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/availability", {
        params: formData
      });
      setAvailabilityResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
      setAvailabilityResult(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Check Vehicle Availability</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="location">
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
              <Button
                className="mt-4 w-100"
                variant="primary"
                onClick={checkAvailability}
              >
                Check Availability
              </Button>
            </Form>

            {availabilityResult && (
              <Alert variant="success" className="mt-4 text-center">
                Vehicle available with ID: {availabilityResult.vehicleId}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AvailabilityForm;
