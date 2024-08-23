import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ScheduleForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    vehicleId: "",
    startDateTime: "",
    durationMins: "",
    customerName: "",
    customerPhone: "",
    customerEmail: ""
  });
  const [scheduleResult, setScheduleResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.vehicle) {
      const vehicle = location.state.vehicle;
      setFormData({
        ...formData,
        vehicleId: vehicle.id,
        startDateTime: vehicle.startDateTime,
        durationMins: vehicle.durationMins
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scheduleTestDrive = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/schedule",
        formData
      );
      setScheduleResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
      setScheduleResult(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Schedule a Test Drive</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="vehicleId">
                <Form.Label>Vehicle ID</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="startDateTime" className="mt-3">
                <Form.Label>Start DateTime</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startDateTime"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="durationMins" className="mt-3">
                <Form.Label>Duration (Minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="durationMins"
                  value={formData.durationMins}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="customerName" className="mt-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="customerPhone" className="mt-3">
                <Form.Label>Customer Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>
              <Form.Group controlId="customerEmail" className="mt-3">
                <Form.Label>Customer Email</Form.Label>
                <Form.Control
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Button
                className="mt-4 w-100"
                variant="primary"
                onClick={scheduleTestDrive}
              >
                Schedule Test Drive
              </Button>
            </Form>

            {scheduleResult && (
              <Alert variant="success" className="mt-4 text-center">
                Test Drive scheduled successfully for{" "}
                {scheduleResult.customerName}!
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ScheduleForm;
