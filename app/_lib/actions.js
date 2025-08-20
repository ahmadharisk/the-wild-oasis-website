"use server";

import {auth, signIn, signOut} from "@/app/_lib/auth";
import {deleteBooking, getBookings, updateBooking, updateGuest} from "@/app/_lib/data-service";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function updateReservation(formData) {
  const session = await auth();
  const bookingId = Number(formData.get("reservationId"));

  if (!session) {
    throw new Error("Not logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to edit this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0,200),
  }

  await updateBooking(bookingId, updateData);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", {redirectTo: "/account"})
}

export async function signOutAction() {
  await signOut({redirectTo: "/"});
}

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("Not logged in");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("national ID must be a valid number");
  }

  const updateData = {nationality, countryFlag, nationalID};

  await updateGuest(session.user.guestId, updateData)

  revalidatePath("/account/profile")
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("Not logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations")
}