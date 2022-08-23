import { LoginProps } from "pages/log-in";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

type CustomInputProps = UseControllerProps<LoginProps> &
  InputHTMLAttributes<HTMLInputElement>;
interface InputProps extends CustomInputProps {
  label: string;
  ref: HTMLInputElement;
}
const MuiInput = forwardRef<any, InputProps>(
  ({ label, control, name, rules, ...rest }, ref) => {
    const [focus, setFocus] = useState(false);
    const { field } = useController({
      name,
      control,
      rules,
    });

    return (
      <div
        className="grow"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <label
          className={`rounded-[4px] border relative h-[57px] flex ${
            focus
              ? "shadow-[rgb(29,155,240)_0px_0px_0px] border-tSky"
              : "border-[rgb(51,54,57)]"
          } duration-150`}
        >
          <div className="absolute w-full h-full flex justify-between basis-auto">
            <div
              className={` px-[8px] text-ellipsis overflow-hidden whitespace-nowrap  ${
                field.value || focus
                  ? "pt-[8px] text-sm"
                  : "pt-[15px] text-[16px]"
              } ${
                focus ? "text-tSky" : "text-[rgb(113,118,123)]"
              } duration-150`}
            >
              <span className="text-inherit">{label}</span>
            </div>
          </div>
          <div className="pt-[11px] pb-[8px] mt-[15px] px-[8px] grow">
            <div className="text-[16px] leading-[23px]">
              <input
                className="bg-black focus:outline-none w-full"
                {...rest}
                {...field}
              />
            </div>
          </div>
        </label>
      </div>
    );
  }
);
MuiInput.displayName = "NAME";

export default MuiInput;
