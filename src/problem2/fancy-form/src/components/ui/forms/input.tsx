import { forwardRef } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TokenPicker from "./token-picker";

type InputProps = {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  value?: string | number;
  id: string;
  onChange?: (value: number) => void;
  nickName: string;
  showTokenPicker?: boolean;
};

const Input = forwardRef<NumericFormatProps, InputProps>(
  (
    {
      label,
      error,
      className,
      value,
      id,
      onChange,
      nickName,
      showTokenPicker = true,
    },
    ref
  ) => {
    return (
      <div
        className={twMerge(
          classNames(
            "border border-solid border-white/40 rounded-xl py-2 px-4",
            className
          )
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <label className="block text-13px flex-1">
            {label && (
              <span className="block cursor-pointer pb-2.5 font-normal text-white/40">
                {label}
              </span>
            )}
            <NumericFormat
              id={id}
              name={id}
              getInputRef={ref}
              value={value}
              allowNegative={false}
              decimalScale={9}
              thousandSeparator=","
              inputMode="decimal"
              max={10_000_000_000}
              maxLength={18}
              min={0}
              className="outline-none bg-transparent w-full font-bold text-3xl py-4"
              onValueChange={(values) => {
                if (!values) return;
                onChange?.(values.floatValue || 0);
              }}
            />
          </label>
          {showTokenPicker && <TokenPicker nickName={nickName} />}
        </div>
        {error && (
          <span role="alert" className="block pt-2 text-xs text-warning">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
