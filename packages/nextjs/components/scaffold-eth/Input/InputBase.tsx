import { ChangeEvent, ReactNode, useCallback } from "react";
import clsx from "clsx";
import { CommonInputProps } from "~~/components/scaffold-eth";

type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
};

export const InputBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  className,
}: InputBaseProps<T>) => {
  let modifier = "";
  if (error) {
    modifier = "border-error";
  } else if (disabled) {
    modifier = "border-disabled bg-base-300";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
  );

  return (
    <div className={`flex border-2 border-gray-300 bg-base-300 rounded-full text-accent ${modifier}`}>
      {prefix}
      <input
        className={clsx(
          "input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-600 h-12 min-h-12 px-4 border w-full font-medium placeholder:text-gray-400 text-gray-600 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400",
          className,
        )}
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
      />
      {suffix}
    </div>
  );
};
