import clsx from "clsx";
import { Icon } from "@phosphor-icons/react";
import { ExclamationMarkIcon, CheckIcon } from "@phosphor-icons/react/ssr";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<React.ComponentProps<Icon>>;
  label: string;
  error?: string;
  isValid?: boolean;
}

export function InputField({
  icon: IconComponent,
  label,
  error,
  isValid,
  ...rest
}: IInput) {

  return (
    <label className="form-line flex flex-col w-full">
      <span className="form-label flex items-center gap-1.5 mb-[7px]">
        {IconComponent && (
          <span className="shrink-0 text-myOrange" >
            <IconComponent size={20} weight="fill" />
          </span>
        )}
        <span className="text-base/normal font-bold">{label}</span>
      </span>

      <span className="block w-full relative">
        <input
          className={clsx(
            "textbox",
            error && "border-myRed",
            isValid && "border-myGreen"
          )}
          {...rest}
        />
        {error && <span className="absolute right-4 top-3.5 size-5 text-myRed"><ExclamationMarkIcon size={20} weight="bold" /></span>}
        {isValid && <span className="absolute right-4 top-3.5 size-5 text-myGreen"><CheckIcon size={20} weight="bold" /></span>}
      </span>

      {error && (
        <span className="block mt-[7px] text-myRed">{error}</span>
      )}
    </label>
  );
}
