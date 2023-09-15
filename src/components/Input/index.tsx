import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

function InputComponent(props: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        {...props}
        placeholder="Cidade"
        className={`border-none outline-none p-2 rounded text-black ${props.className}`}
      />
      {props.error && (
        <p className="text-red-600 font-semibold">{props.error}</p>
      )}
    </div>
  );
}

export const Input = forwardRef(InputComponent);
