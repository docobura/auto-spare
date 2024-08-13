import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/shop" className="text-black hover:text-gray-700">
            Shop
          </Link>
          <Link to="/dashboard" className="text-black hover:text-gray-700">
            Dashboard
          </Link>
          <Link to="/servicing" className="text-black hover:text-gray-700">
            Servicing
          </Link>
          <Link to="/reviews" className="text-black hover:text-gray-700">
            Reviews
          </Link>
          <Link to="/cart" className="text-black hover:text-gray-700">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
};

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
      <Header />
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
          ) : (
            <div className="bg-white text-black p-4 rounded-lg w-full">
              <h3 className="text-2xl mb-4">Appointment Summary</h3>
              <table className="table-auto w-full mb-4">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Service:</td>
                    <td className="border px-4 py-2">
                      {bookingData.serviceName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Date & Time:</td>
                    <td className="border px-4 py-2">
                      {bookingData.appointment_date.toString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Status:</td>
                    <td className="border px-4 py-2">{bookingData.status}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="bg-green-500 text-white rounded-md hover:bg-green-600 p-2"
                onClick={() => alert("Appointment Confirmed!")}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointmentPage;
