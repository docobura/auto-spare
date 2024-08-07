import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex gap-4 justify-center">
        <div className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="flex-auto">AutoSavy</div>
        </div>
        <div className="flex items-center gap-4 text-sm text-black">
          <Link to="/shop">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>
    </header>
  );
};

const ServiceAppointmentPage = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const location = useLocation();
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
    <div className="w-screen h-screen bg-black text-white flex flex-col pt-[72px]"> {/* Adjust padding-top to ensure space for the header */}
      <Header />
      <div className="flex flex-col items-center flex-grow">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <img src={imageUrl} alt={label} className="object-contain w-full h-[200px] rounded-[20px]" />
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
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointmentPage;
