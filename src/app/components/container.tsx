import React from "react";

export interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-[#ff80b5] to-[#9089fc]">
      {children}
    </div>
  );
};

export default Container;
