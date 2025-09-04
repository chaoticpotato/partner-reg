"use client";
import { useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { IDealership } from "../lib/types";
import DealershipItem from "./DealershipItem";
import { XIcon, BuildingIcon } from "@phosphor-icons/react";

export default function DealershipsList({ data }: { data: IDealership[] }) {
  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((dealership) =>
      dealership.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <section className="px-0 lg:px-[3px] space-y-3 lg:space-y-5">
      <div className="white-box">
        <label className="flex gap-1.5 items-center font-bold text-base/normal mb-1.5 w-full" htmlFor="search">
          <BuildingIcon size={20} className="shrink-0 text-myOrange" weight="fill" />
          Search Company
        </label>
        <div className="relative">
          <input
            className="textbox"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Start typing name, company, phone or email for search"
          />
          {search && (
            <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full cursor-pointer bg-myBlack/5 hover:bg-myBlack/15 p-2 transition-colors" onClick={() => setSearch("")}>
              <XIcon size={24} />
            </button>
          )}
        </div>
      </div>

      {filteredData.length === 0 && searchTerm ? (
        <div className="bg-white/5 border border-white rounded-3xl p-6 text-center">
          <p className="text-white">No results found for &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <section className="px-0 lg:px-[3px] space-y-3 lg:space-y-5">
          {filteredData.map((item) => (
            <DealershipItem item={item} key={item.id} />
          ))}
        </section>
      )}
    </section>
  );
}
