import React from "react";

import { Message } from "primereact/message";
import { Images } from "../../assets/images";

const AlertMessage = ({ content, severity }) => {
  const customTheme = {
    root: `${
      severity === "info"
        ? "bg-[#A8D1DF]"
        : severity === "success"
        ? "bg-[#28A745]"
        : severity === "error"
        ? "bg-[#DC3545]"
        : "bg-[#FFC107]"
    } text-white md:rounded-xs rounded-xxs  shadow-2xl overflow-hidden lg:p-0.10 md:p-0.8 p-0.5  border-l-5 border-white`,
    icon: "md:w-6 md:h-6 w-5 h-5",
  };

  return (
    <Message pt={customTheme} content={content} severity={severity} icon />
  );
};

export default AlertMessage;
