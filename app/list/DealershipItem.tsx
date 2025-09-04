import { IDealership } from "../lib/types";

export default function DealershipItem({ item }: { item: IDealership }) {
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