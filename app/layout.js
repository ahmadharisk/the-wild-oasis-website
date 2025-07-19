import "@/app/_styles/globals.css"
import {Josefin_Sans} from "next/font/google";
import Header from "@/app/_components/Header";
import {ReservationContextProvider} from "@/app/_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to The Wild Oasis"
  },
  description: "Web for book beautiful hotel, surrounded with nature",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body
      className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
    >
    <Header/>
    <div className={"grid flex-1 px-8 py-12"}>
      <main className={"max-w-7xl mx-auto w-full"}>
        <ReservationContextProvider>
          {children}
        </ReservationContextProvider>
      </main>
    </div>
    </body>
    </html>
  );
}
