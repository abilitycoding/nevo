import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleBookClick = (vehicle) => {
    navigate("/schedule", { state: { vehicle } });
  };

  const handleClearBooking = async (vehicleId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/vehicles/${vehicleId}/clearBooking`
      );
      // Fetch the updated vehicle list
      const response = await axios.get("http://localhost:8000/api/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error clearing booking", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Available Vehicles</h1>
      <Row>
        {vehicles.map((vehicle) => (
          <Col md={4} key={vehicle.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{vehicle.vehicleType}</Card.Title>
                <Card.Text>
                  Vehicle ID: {vehicle.id}
                  <br />
                  Location: {vehicle.location}
                  <br />
                  Availability: {vehicle.isAvailable ? "Available" : "Booked"}
                </Card.Text>
                {vehicle.isAvailable ? (
                  <Button
                    variant="primary"
                    onClick={() => handleBookClick(vehicle)}
                  >
                    Book
                  </Button>
                ) : (
                  <div className="d-flex gap-3">
                    <Button variant="danger" disabled>
                      Booked
                    </Button>
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleClearBooking(vehicle.id)}
                    >
                      Clear Booking
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
