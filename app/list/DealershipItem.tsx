import { TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { IDealership } from "../lib/types";
import { deleteDealership } from "../lib/actions";
import { toast } from "sonner";

export default function DealershipItem({ item }: { item: IDealership }) {
  const handleDelete = (id: string) => {
    deleteDealership(id)
      .then((response) => {
        if (response.success) {
          toast.success("Dealership deleted successfully!");
        } else {
          toast.error(`Failed to delete dealership: ${response.message}`);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the dealership");
        console.error("An error occurred:", error);
      });
  };

  return (
    <article
      className="white-box text-sm lg:text-base leading-normal"
      data-cy="dItem"
    >
      <h2
        className="text-base/normal lg:text-myXl font-bold mb-5 flex items-center justify-between group"
        data-cy="dItem-name"
      >
        {item.name}
        <button
          onClick={() => handleDelete(item.id)}
          className="block opacity-10 group-hover:opacity-100 cursor-pointer"
        >
          <TrashIcon size={24} />
        </button>
      </h2>
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
