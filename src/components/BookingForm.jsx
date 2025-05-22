import React from "react";
import { useState } from "react";

const BookingForm = ({ rentals, updateBookings }) => {
  const [formData, setFormData] = useState({ rental: "", date: "", guests: 1 });

  const handleChange = e => {
    console.log(e);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateBookings(formData);
  };
  return (
    <div>
      <h2>Book a Stay</h2>
      <form onSubmit={handleSubmit} data-cy="booking-form">
        <label>
          Rental:
          <select data-cy="input-rental" 
          name="rental" 
          onChange={handleChange} 
          value={formData.rental}
          >
            {rentals.map(r => (
              <option value={r}>{r}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            data-cy="input-date"
            name="date"
            type="date"
            required
            onChange={handleChange}
            value={formData.date}
          />
        </label>
        <br />
        <label>
          Number of Guests:
          <input
            data-cy="input-guests"
            name="guests"
            type="number"
            min="1"
            onChange={handleChange}
            value={formData.guests}
          />
        </label>
        <br />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
