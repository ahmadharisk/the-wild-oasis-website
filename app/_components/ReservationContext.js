"use client";
import {createContext, useContext, useState} from "react";

const ReservationContext = createContext();

function ReservationContextProvider({ children }) {
  const initialState = {from: undefined, to: undefined}
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return <ReservationContext.Provider value={{
    range, setRange, resetRange
  }}>
    {children}
  </ReservationContext.Provider>
}

function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("useReservationContext must be used within the context");
  return context;
}

export { ReservationContextProvider, useReservationContext };