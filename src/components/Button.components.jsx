import React from "react";

const ButtonComponents = ({ style, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-2 py-3 bg-gradient w-full text-white active:ring-2 active:ring-purple-600 duration-200 ${style}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponents;
