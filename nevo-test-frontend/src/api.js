const API_BASE_URL = "http://localhost:8000/api";

export async function checkAvailability(location, vehicleType, startDateTime, durationMins) {
    const response = await fetch(
        `${API_BASE_URL}/availability?location=${location}&vehicleType=${vehicleType}&startDateTime=${startDateTime}&durationMins=${durationMins}`
    );
    return response.json();
}

export async function scheduleTestDrive(bookingData) {
    const response = await fetch(`${API_BASE_URL}/schedule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });
    return response.json();
}
