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
      <div className={styles.inputGroup}>
        <label className={styles.label}>Booker Name</label>
        <input {...register('bookerName')} className={styles.input} />
        <ErrorMessage message={errors.bookerName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Booker Email</label>
        <input
          {...register('bookerEmail')}
          className={styles.input}
          type="email"
        />
        <ErrorMessage message={errors.bookerEmail?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Name</label>
        <input {...register('eventName')} className={styles.input} />
        <ErrorMessage message={errors.eventName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Date</label>
        <input
          {...register('eventDate')}
          className={styles.input}
          type="date"
        />
        <ErrorMessage message={errors.eventDate?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Number of Guests</label>
        <input
          {...register('numberOfGuests')}
          className={styles.input}
          type="number"
        />
        <ErrorMessage message={errors.numberOfGuests?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Time Slot</label>
        <select {...register('timeSlot')} className={styles.input}>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.timeSlot?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Link</label>
        <input
          {...register('eventLink')}
          className={styles.input}
          type="url"
        />
        <ErrorMessage message={errors.eventLink?.message} />
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}