import { z } from "zod";

export const TIME_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
] as const;

export const SEATING_OPTIONS = [
  {
    id: "Indoor",
    name: "Indoor",
    description: "Comfortable air-conditioned dining surrounded by curated warmth.",
  },
  {
    id: "Outdoor",
    name: "Outdoor",
    description: "Open-air dining experience beneath gentle evening ambiance.",
  },
  {
    id: "Private Room",
    name: "Private Room",
    description: "Intimate and secluded room tailored for celebrations and meetings.",
  },
] as const;

export const OCCASION_OPTIONS = [
  "Dining",
  "Birthday Celebration",
  "Anniversary",
  "Business Dinner",
  "Family Gathering",
] as const;

export const reservationSchema = z.object({
  customerName: z
    .string()
    .min(2, "Please enter your full name (minimum 2 characters).")
    .max(100, "Name is too long."),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number (minimum 8 digits).")
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+\s\-()]+$/, "Phone number contains invalid characters."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(100, "Email is too long."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD."),
  time: z
    .string()
    .refine((val) => TIME_SLOTS.includes(val as any), {
      message: "Please select an available dining time slot.",
    }),
  guestCount: z
    .number()
    .int()
    .min(1, "Minimum reservation is 1 guest.")
    .max(20, "Online booking is up to 20 guests. For larger parties, please contact us directly."),
  seating: z.enum(["Indoor", "Outdoor", "Private Room"]),
  specialRequest: z.string().max(500, "Special request cannot exceed 500 characters.").optional().nullable(),
  occasion: z.string().max(100).optional().nullable(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
