import React, {Suspense} from 'react';
import {getCabin, getCabins} from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({params}) {
  const {cabinId} = await params;
  let {name} = await getCabin(cabinId);

  return {title: ` Cabin ${name}`}
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map(cabin => ({cabinId: cabin.id.toString()}));
}

async function Page({params}) {
  const {cabinId} = await params;
  const cabin = await getCabin(cabinId);
  const {name} = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-8 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner/>}>
          <Reservation cabin={cabin}/>
        </Suspense>
      </div>
    </div>
  )
}

export default Page;