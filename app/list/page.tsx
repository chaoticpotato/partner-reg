import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Dealerships from "./Dealerships";

export default function List() {
  return (
    <main className="bg-mySmoke min-h-screen">
      <Header />
      <div className="wrapper max-w-[50rem] py-4 lg:py-8">
        <h1 className="font-bold text-2xl/normal lg:text-my2xl text-white mb-3 lg:mb-5">
          Interested Dealerships
        </h1>
        <Suspense fallback={<Spinner />}>
          <Dealerships />
        </Suspense>
      </div>
    </main>
  );
}
