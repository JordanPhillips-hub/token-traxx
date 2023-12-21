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
  onChange,
}: FormInputProps) {
  return (
    <>
      <label className="hidden" htmlFor={id}>
        {label}
      </label>
      <input
        className="dark:bg-blue800 placeholder:text-sm py-3 pl-10 pr-4 rounded-md focused-primary"
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
