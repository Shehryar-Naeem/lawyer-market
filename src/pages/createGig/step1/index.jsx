import React from "react";
import { Steps } from "primereact/steps";
import { classNames } from "primereact/utils";
const GigStepOne = () => {
  const items = [
    {
      label: "Personal Info",
    },
    {
      label: "Reservation",
    },
    {
      label: "Review",
    },
  ];
  const custometheme = {
    root: "relative",
    menu: "p-0 m-0 list-none flex",
    menuitem: {
      className: classNames(
        "relative flex justify-center flex-1 overflow-hidden",
        "before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2"
      ),
    },
    action: {
      className: classNames(
        "inline-flex flex-col items-center overflow-hidden",
        "transition-shadow rounded-md bg-white dark:bg-transparent",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]"
      ),
    },
    step: {
      className: classNames(
        "flex items-center justify-center",
        "text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900 w-[2rem] h-[2rem] leading-2rem text-sm z-10 rounded-full"
      ),
    },
    label: {
      className: classNames(
        "block",
        "whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full",
        "mt-2 text-gray-500 dark:text-white/60"
      ),
    },
  };
  return (
    <div className="page-container">
      <div className="container     m-auto gap-2 md:p-0 p-4">
        <Steps model={items} activeIndex={0} pt={custometheme} />
      </div>
    </div>
  );
};

export default GigStepOne;
