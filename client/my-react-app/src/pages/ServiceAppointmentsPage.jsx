import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../components/Auth/AuthContext";
import "./ServiceAppointmentPage.css";

const ServiceAppointmentPage = () => {
  const { authToken, userId } = useAuth();
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const label = query.get("label");
  const imageUrl = query.get("imageUrl");
  const serviceId = query.get("id");

  useEffect(() => {
    console.log("Service ID:", serviceId);
  }, [serviceId]);

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleTimeSlotChange = (slot) => {
    setTimeSlot(slot);
  };

  const handleBooking = async () => {
    if (!appointmentDate || !timeSlot) {
      alert("Please select a date and time slot for your appointment.");
      return;
    }

    if (!userId) {
      alert("User ID is not available. Please log in.");
      return;
    }

    if (!serviceId) {
      alert("Service ID is not available. Please select a service.");
      return;
    }

    // Extract the date part
    const datePart = appointmentDate.toISOString().slice(0, 10);

    // Extract the time part and convert to 24-hour format
    const timePart = timeSlot.split(" - ")[0];
    const [time, modifier] = timePart.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "pm" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "am" && hours === "12") {
      hours = "00";
    }
    const formattedTime = `${hours}:${minutes}:00`;

    // Combine date and time to form the correct datetime format
    const appointment_date = `${datePart} ${formattedTime}`;

    const bookingDetails = {
      user_id: userId,
      service_id: serviceId,
      appointment_date,
      status: "Pending",
      firstName,
      lastName,
      email,
      phoneNumber,
      note,
    };

    console.log("Booking Details:", bookingDetails);

    try {
      const response = await fetch("http://127.0.0.1:5000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
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

        // Call the Flask backend to send confirmation email
        const appointmentDetails = `Service: ${label}, Date & Time: ${appointment_date}`;
        const emailResponse = await fetch(
          "http://127.0.0.1:5000/confirm_appointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              email,
              appointment_details: appointmentDetails,
            }),
          }
        );

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log("Email sent:", emailResult);
        } else {
          const emailError = await emailResponse.json();
          console.error("Email Error:", emailError);
        }
      } else {
        const error = await response.json();
        console.error("Booking Error: ", error);
        alert("Failed to book the appointment. Error: " + error.error);
      }
    } catch (error) {
      console.error("Network Error: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="service-appointment-page">
      <div className="appointment-container">
        {!showSummary ? (
          <>
            <img src={imageUrl} alt={label} className="appointment-image" />
            <h2 className="appointment-label">{label}</h2>
            <div className="date-picker-container">
              <DatePicker
                selected={appointmentDate}
                onChange={handleDateChange}
                placeholderText="Select a date"
                className="custom-date-picker"
              />
            </div>
            <div className="time-slot-container">
              <h3>Select a Time Slot</h3>
              <div className="time-slot-grid">
                {[
                  "12:00 pm - 1:00 pm",
                  "1:00 pm - 2:00 pm",
                  "2:00 pm - 3:00 pm",
                  "3:00 pm - 4:00 pm",
                  "4:00 pm - 5:00 pm",
                ].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSlotChange(slot)}
                    className={`time-slot-button ${
                      timeSlot === slot ? "selected-slot" : ""
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div className="basic-details-container">
              <h3>Basic Details</h3>
              <input
                type="text"
                placeholder="Enter your firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="detail-input"
              />
              <input
                type="text"
                placeholder="Enter your lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="detail-input"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="detail-input"
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="detail-input"
              />
              <textarea
                placeholder="Enter note details"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="detail-textarea"
              />
            </div>
            <button
              className="confirm-appointment-button"
              onClick={handleBooking}
            >
              Confirm Appointment
            </button>
          </>
        ) : (
          <div className="booking-confirmation">
            <div className="success-icon">
              {/* You can add an SVG or image for the success icon */}
            </div>
            <h2>Booking ID: #{bookingData.id}</h2>
            <h3>Your Appointment Booked successfully!</h3>
            <p>We have sent your booking information to your email address.</p>
            <div className="appointment-details">
              <p>Service: {bookingData.serviceName}</p>
              <p>
                Date & Time:{" "}
                {new Date(bookingData.appointment_date).toLocaleString()}
              </p>
              <p>Customer Name: {`${firstName} ${lastName}`}</p>
            </div>
            <div className="add-to-calendar">
              {/* Add to Calendar buttons go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceAppointmentPage;
