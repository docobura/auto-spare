import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceAppointmentPage = ({ serviceId, userId }) => {
  console.log("User ID:", userId);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const label = query.get("label");
  const imageUrl = query.get("imageUrl");

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleBooking = async () => {
    if (!appointmentDate) {
      alert("Please select a date for your appointment.");
      return;
    }

    if (!userId) {
      alert("User ID is not available. Please log in.");
      return;
    }

    const bookingDetails = {
      user_id: userId,
      service_id: serviceId,
      appointment_date: appointmentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " "), // Correct format
      status: "Pending",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingData({
          ...bookingDetails,
          id: result.id,
          serviceName: label,
        });
        setShowSummary(true);
      } else {
        const error = await response.json();
        console.error("Response Error: ", error);
        alert("Failed to book the appointment. Error: " + error.error);
      }
    } catch (error) {
      console.error("Network Error: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col pt-[72px]">
      <div className="flex flex-col items-center flex-grow">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          {!showSummary ? (
            <>
              <img
                src={imageUrl}
                alt={label}
                className="object-contain w-full h-[200px] rounded-[20px]"
              />
              <h2 className="mt-4 text-3xl">{label}</h2>
              <div className="mt-4">
                <DatePicker
                  selected={appointmentDate}
                  onChange={handleDateChange}
                  placeholderText="Select a date"
                  className="p-2 border border-white rounded-md bg-gray-700 text-white"
                />
              </div>
              <button
                className="mt-4 bg-blue-500 text-white rounded-md hover:bg-green-600 p-2"
                onClick={handleBooking}
              >
                Confirm Appointment
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointmentPage;
