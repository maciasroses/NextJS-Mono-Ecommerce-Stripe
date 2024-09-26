import { cn } from "@/app/utils/cn";

interface IGenericInput {
  id: string;
  ariaLabel: string;
  type: string;
  step?: string;
  min?: string;
  max?: string;
  rows?: number;
  autoComplete?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  defaultChecked?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const GenericInput: React.FC<IGenericInput> = ({
  id,
  ariaLabel,
  type,
  autoComplete,
  step,
  min,
  max,
  rows = 3,
  options,
  defaultValue,
  defaultChecked,
  placeholder,
  className = "",
  labelClassName = "",
  error,
  onChange,
}) => {
  const commonProps = {
    id,
    name: id,
    autoComplete,
    onChange,
    defaultValue,
    "aria-label": ariaLabel,
    className: cn(
      "border p-2.5 text-sm rounded-lg dark:bg-gray-900 focus:outline-none",
      type === "checkbox" ? "cursor-pointer" : "w-full",
      className,
      error
        ? "bg-red-50 text-red-900 dark:text-red-300 placeholder-red-700 dark:placeholder-red-500 border-red-500 focus:border-red-700 dark:focus:border-red-300"
        : "bg-gray-50 text-gray-900 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-gray-500 dark:focus:border-gray-100"
    ),
  };

  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {ariaLabel}
      </label>
      {type === "textarea" ? (
        <textarea placeholder={placeholder} rows={rows} {...commonProps} />
      ) : type === "select" && options ? (
        <select {...commonProps}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          step={step}
          min={min}
          max={max}
          defaultChecked={defaultChecked}
          {...commonProps}
        />
      )}
      {error && (
        <small className="text-red-600 dark:text-red-300">{error}</small>
      )}
    </>
  );
};

export default GenericInput;
