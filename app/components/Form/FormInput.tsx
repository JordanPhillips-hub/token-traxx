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
  onChange,
}: FormInputProps) {
  const defaultStyles = "placeholder:text-sm rounded-md focused-primary";

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
      />
    </>
  );
}
