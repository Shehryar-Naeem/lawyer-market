import React from "react";
import AccountComp from "./AccountComp";
import { useSelector } from "react-redux";

const Accounts = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const roles = user?.roles;
  return (
    <div className="w-full h-full flex flex-col lg:gap-1 md:gap-0.10 gap-0.8 md:border-2 border-1 border-solid border-gray-400 general-pad md:rounded-xs rounded-xxs">
      <h3 className="lg:text-xl md:text-lg text-base font-extrabold capitalize">
        Your Accounts
      </h3>
      <div className="f-col gap">
        {roles?.map((role) => (
          <AccountComp key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
};

export default Accounts;
