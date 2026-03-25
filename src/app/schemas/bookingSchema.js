import { z } from 'zod';

export const createBookingSchema = (availableTimeSlots = []) =>
  z.object({
    bookerName: z
      .string()
      .min(2, 'Booker name must be at least 2 characters long'),

    bookerEmail: z
      .union([
        z.string().email('Invalid email address'),
        z.literal(''),
        z.undefined(),
      ]),

    eventName: z
      .string()
      .min(2, 'Event name must be at least 2 characters long'),

    eventDate: z
      .date({
        invalid_type_error: 'Event date must be in the future',
      })
      .refine((date) => date > new Date(), {
        message: 'Event date must be in the future',
      }),

    numberOfGuests: z
      .coerce.number({
        invalid_type_error: 'Number of Guests must be integer',
      })
      .int('Number of Guests must be integer')
      .min(1, 'Number of Guests must be at least 1')
      .max(10, 'Number of Guests must be less than or equal to 10'),

    timeSlot: z
      .string()
      .refine((val) => availableTimeSlots.includes(val), {
        message: 'Selected time slot is unavailable',
      }),

    eventLink: z
      .string()
      .url('Invalid URL. Please enter a valid event link'),
  });