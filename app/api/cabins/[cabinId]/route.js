import {getBookedDatesByCabinId, getCabin} from "@/app/_lib/data-service";

export async function GET(req, {params}) {
  const {cabinId} = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);

    return Response.json({cabin, bookedDates});
  } catch (e) {
    console.error(e);
    return Response.json({message: "cabin not found"})
  }

}

export async function POST() {}