import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Dealerships from "./Dealerships";

export const metadata = {
  title: 'Interested Dealerships | Bumper',
  description: 'Sign up your dealership and offer your customers interest free finance on car repairs, services, accessories and parts by signing up to Bumper.',
};


export default function List() {
  return (
    <main className="bg-mySmoke min-h-screen">
      <Header />
      <div className="wrapper max-w-[50rem] py-4 md:py-6 lg:py-8">
        <h1 className="font-bold text-2xl/normal md:text-3xl/normal lg:text-my4xl text-white mb-3 md:mb-4 lg:mb-5">
          Interested Dealerships
        </h1>
        <Suspense fallback={<Spinner />}>
          <Dealerships />
        </Suspense>
      </div>
    </main>
  );
}
