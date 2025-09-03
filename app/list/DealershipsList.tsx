import { getDealerships } from "../lib/actions";
import { IDealership } from "../lib/types";

function DealershipItem({ item }: { item: IDealership }) {
  return (
    <article className="white-box text-sm lg:text-base leading-normal">
      <h2 className="text-base/normal lg:text-myXl font-bold mb-5">{item.name}</h2>
      <div className="flex justify-between py-4 border-y border-[#CDD2DC]">
        <p className="font-bold">Company</p>
        <p>{item.company}</p>
      </div>
      <div className="flex justify-between py-4 border-b border-[#CDD2DC]">
        <p className="font-bold">Mobile phone number</p>
        <p>{item.mobile_phone}</p>
      </div>
      <div className="flex justify-between py-4 border-b border-[#CDD2DC]">
        <p className="font-bold">Email address</p>
        <p>{item.email_address}</p>
      </div>
      <div className="flex justify-between py-4 border-b border-[#CDD2DC]">
        <p className="font-bold">Postcode</p>
        <p>{item.postcode}</p>
      </div>
    </article>
  );
}

export async function DealershipsList() {
  const result = await getDealerships({ delayInSecs: 1 }); // for simulate delay

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-xs mx-auto">
        <p className="text-red-600">{result.error || "Something went wrong"}</p>
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-xs mx-auto">
        <p className="text-blue-600">No dealership yet</p>
      </div>
    );
  }

  return (
    <section className="px-0 lg:px-[3px] space-y-3 lg:space-y-5">
      <div className="white-box">search area</div>
      {result.data.map((item) => (
        <DealershipItem item={item} key={item.id} />
      ))}
    </section>
  );
}
