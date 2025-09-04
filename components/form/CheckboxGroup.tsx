import { Icon } from "@phosphor-icons/react";
import Checkbox from "./Checkbox";

interface ICheckboxGroup extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<React.ComponentProps<Icon>>;
  title: string;
  desc?: string;
  error?: string;
  isValid?: boolean;
  options: { label: string; value: string }[];
}

export default function CheckboxGroup({
  icon: IconComponent,
  title,
  desc,
  options,
  error,
  ...rest
}: ICheckboxGroup) {
  return (
    <div className="form-line flex flex-col w-full">
      <span className="form-label flex items-center gap-1.5">
        {IconComponent && (
          <span className="shrink-0 text-myOrange">
            <IconComponent size={20} weight="fill" />
          </span>
        )}
        <span className="text-base/normal font-bold">{title}</span>
      </span>
      {desc && <p className="text-sm text-[#737373]">{desc}</p>}

      <div className="mt-[7px] flex gap-3">
        {options.map((item) => (
          <Checkbox
            key={item.value}
            hasError={!!error}
            label={item.label}
            val={item.value}
            {...rest}
          />
        ))}
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
