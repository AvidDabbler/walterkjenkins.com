import React, { MouseEventHandler, ReactNode } from "react";

export const Button = ({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return (
    <button
      className="hover:blue-100 float-right rounded bg-blue-300 p-3 duration-75 hover:shadow-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
