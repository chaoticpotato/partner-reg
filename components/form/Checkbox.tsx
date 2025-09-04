import {
  ExclamationMarkIcon,
  CheckIcon,
  PlusIcon,
} from "@phosphor-icons/react/ssr";
import clsx from "clsx";

export default function Checkbox({
  label,
  hasError,
  val,
  ...rest
}: {
  label: string;
  val: string;
  hasError: boolean;
}) {
  return (
    <label data-cy="chItem">
      <input
        type="checkbox"
        className="custom-ch w-0 h-0 inline float-left opacity-0"
        value={val}
        {...rest}
      />
      <span className={clsx("custom-ch-label", hasError && "border-myRed")}>
        <span>{label}</span>
        {hasError ? (
          <ExclamationMarkIcon size={16} weight="bold" className="text-myRed" />
        ) : (
          <>
            <CheckIcon className="success" size={16} weight="bold" />
            <PlusIcon className="neutral" size={16} weight="bold" />
          </>
        )}
      </span>
    </label>
  );
}
