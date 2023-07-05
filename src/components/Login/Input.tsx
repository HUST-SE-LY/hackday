import { useState } from "react";

type inputProps = {
  content: string;
  onSetContent: (value: string) => void;
  placeholder: string;
  type: "text" | "password";
  isError: boolean;
};

const Input = ({ content, onSetContent, placeholder, type, isError }: inputProps) => {
  const [focus, setFocus] = useState(content ? true : false);
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={content}
        className={`w-full outline-none py-[0.5rem] transition-all focus:border-b-black border-b-2 border-b-gray-400 ${isError?"border-b-red-500":""}`}
        onFocus={() => setFocus(true)}
        onBlur={() => !content&&setFocus(false)}
        onChange={(e) => onSetContent(e.target.value)}
      />
      <p className={`absolute pointer-events-none transition-all text-gray-400 ${focus ? "top-[-20px] text-sm left-0" : "top-[0.5rem] left-[1rem]"}`}>{placeholder}</p>
    </div>
  );
};

export default Input;
