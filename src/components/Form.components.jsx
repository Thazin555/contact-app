import React from "react";

const FormComponents = ({ type, name, label, placeholder = "", ...rest }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="px-5 py-3.5 text-sm text-purple-950 font-[500] placeholder:text-purple-800 placeholder:font-[500] rounded-full mt-2 shadow shadow-purple-200 focus-visible:outline-none focus:shadow-purple-400"
      />
    </div>
  );
};

export default FormComponents;
