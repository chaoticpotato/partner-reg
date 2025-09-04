import usePostcodeSearch from "@/app/hooks/usePostcodeSearch";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { CaretDownIcon, CheckIcon, HouseLineIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState, useMemo } from "react";

export default function Postcode({
  value,
  onChange,
  placeholder = "Start typing to match your address",
  error,
  className = "",
  isValid
}: {
  value: string;
  onChange: (e: unknown) => void;
  placeholder: string;
  className?: string;
  error?: string;
  isValid: boolean
}) {
  const [query, setQuery] = useState("");
  const { suggestions, loading, error: apiError } = usePostcodeSearch(query);

  // Filter suggestions based on current input
  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    return suggestions.filter((postcode) =>
      postcode.toLowerCase().includes(query.toLowerCase())
    );
  }, [suggestions, query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);

    if (!newValue) {
      onChange("");
    }
  };

  const handleSelection = (selectedPostcode: string) => {
    onChange(selectedPostcode);
    setQuery(selectedPostcode || "");
  };

  const hasError = error || apiError;

  return (
    <div>
      <label htmlFor="postcombo" className="flex items-center gap-1.5 mb-[7px]">
        <HouseLineIcon size={20} weight="fill" className="text-myOrange" />
        <span className="text-base/normal font-bold">Postcode</span>
      </label>
      <div className={`relative ${className}`}>
        <Combobox value={value || ""} onChange={handleSelection}>
          <div className="relative">
            <ComboboxInput
              className={clsx("textbox", !!hasError && "border-myRed", isValid && "border-myGreen")}
              placeholder={placeholder}
              id="postcombo"
              onChange={handleInputChange}
              displayValue={(postcode: string) => postcode}
            />

            {value !== null && (
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center p-3 pr-4.5">
                <CaretDownIcon size={20} aria-hidden="true" />
              </ComboboxButton>
            )}
          </div>

          <ComboboxOptions data-cy="suggestions" className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-base border border-myBlack focus:outline-none sm:text-sm">
            {loading && (
              <div className="px-3 py-2 text-gray-500 text-sm">Searching</div>
            )}

            {!loading && query && filteredSuggestions.length === 0 && (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No postcodes found
              </div>
            )}

            {filteredSuggestions.map((postcode) => (
              <ComboboxOption
                key={postcode}
                value={postcode}
                className="group relative cursor-default select-none py-3 pl-4 pr-9 text-gray-900 data-[focus]:bg-myOrange data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {postcode}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-blue-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>

        {!!hasError && (
          <span className="field-error">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
