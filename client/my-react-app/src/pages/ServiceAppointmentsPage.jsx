import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ServiceAppointmentPage = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const icon = query.get('icon');
  const label = query.get('label');
  const imageUrl = query.get('imageUrl');

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleBooking = async () => {
    if (!appointmentDate) {
      alert('Please select a date for your appointment.');
      return;
    }

    const bookingData = { icon, label, imageUrl, appointmentDate };

    try {
      const response = await fetch('/api/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking service:', data);
        alert('Appointment confirmed!');
        navigate('/confirmation'); // Redirect to a confirmation page
      } else {
        console.error('Error booking service:', response.statusText);
        alert('Failed to book the appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking service:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <img src={imageUrl} alt={label} className="object-contain w-full h-[200px] rounded-[20px]" />
        <h2 className="mt-4 text-3xl">{label}</h2>
        <div className="mt-4">
          <DatePicker 
            selected={appointmentDate}
            onChange={handleDateChange}
            placeholderText="Select a date"
            className="p-2 border rounded-md"
          />
        </div>
        <button 
          className="mt-4 bg-blue-500 text-white rounded-md hover:bg-green-600"
          onClick={handleBooking}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default ServiceAppointmentPage;
