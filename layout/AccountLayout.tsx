import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: LayoutProps) => {
  return <div className="p-[15px] ">{children}</div>;
};

export default AccountLayout;
