
import React from 'react';
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service";

async function Reservation({cabin}) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])

  return (
    <div className={"grid grid-cols-3 border border-primary-800 min-h-[400px]"}>
      <div className={"col-span-2"}>
        <DateSelector
          bookedDates={bookedDates}
          cabin={cabin}
          settings={settings}/>
      </div>
      <ReservationForm cabin={cabin}/>
    </div>
  );
}

export default Reservation;