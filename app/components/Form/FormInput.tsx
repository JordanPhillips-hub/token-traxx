import { twMerge } from "tailwind-merge";

type FormInputProps = {
  label: string;
} & React.ComponentProps<"input">;

export default function FormInput({
  label,
  id,
  type,
  name,
  value,
  placeholder,
  className,
  min,
  max,
  onChange,
}: FormInputProps) {
  const defaultStyles =
    "placeholder:text-sm rounded-md border border-gray-300 focus:outline-none focus:border-purple500";

  return (
    <>
      <label className="hidden" htmlFor={id}>
        {label}
      </label>
      <input
        className={twMerge(defaultStyles, className)}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        min={min}
        max={max}
      />
    </>
  );
}
