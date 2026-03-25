'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createBookingSchema } from '../../schemas/bookingSchema';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch('/api/time-slots')
      .then((res) => res.json())
      .then((data) => setTimeSlots(data))
      .catch(() => setTimeSlots([]));
  }, []);

  const schema = createBookingSchema(timeSlots);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    alert('Booking successful!');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Booker Name */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="bookerName">
          Booker Name
        </label>
        <input
          id="bookerName"
          className={styles.input}
          {...register('bookerName')}
        />
        <ErrorMessage message={errors.bookerName?.message} />
      </div>

      {/* Booker Email */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="bookerEmail">
          Booker Email
        </label>
        <input
          id="bookerEmail"
          type="email"
          className={styles.input}
          {...register('bookerEmail')}
        />
        <ErrorMessage message={errors.bookerEmail?.message} />
      </div>

      {/* Event Name */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="eventName">
          Event Name
        </label>
        <input
          id="eventName"
          className={styles.input}
          {...register('eventName')}
        />
        <ErrorMessage message={errors.eventName?.message} />
      </div>

      {/* Event Date */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="eventDate">
          Event Date
        </label>
        <input
          id="eventDate"
          type="date"
          className={styles.input}
          {...register('eventDate', {
            valueAsDate: true, // 🔥 critical fix
          })}
        />
        <ErrorMessage message={errors.eventDate?.message} />
      </div>

      {/* Number of Guests */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="numberOfGuests">
          Number of Guests
        </label>
        <input
          id="numberOfGuests"
          type="number"
          className={styles.input}
          {...register('numberOfGuests')}
        />
        <ErrorMessage message={errors.numberOfGuests?.message} />
      </div>

      {/* Time Slot */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="timeSlot">
          Time Slot
        </label>
        <select
          id="timeSlot"
          className={styles.input}
          {...register('timeSlot')}
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.timeSlot?.message} />
      </div>

      {/* Event Link */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="eventLink">
          Event Link (Online)
        </label>
        <input
          id="eventLink"
          type="url"
          className={styles.input}
          {...register('eventLink')}
        />
        <ErrorMessage message={errors.eventLink?.message} />
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}