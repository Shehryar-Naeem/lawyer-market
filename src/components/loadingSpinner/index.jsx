import { ProgressSpinner } from "primereact/progressspinner";
import { classNames } from "primereact/utils";
import React from "react";

function LoadingSpinner({ size = 10 }) {
  const customeTheme = {
  

    root: {
      className: classNames(
        "relative mx-auto inline-block ",
        "before:block before:pt-full"
      ),
    },
    spinner:
      "absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-full transform origin-center animate-spin",
    circle: "text-red-500 progress-spinner-circle",
  };
  return (
    <div>
      <ProgressSpinner
        color="#00c8c8"
        pt={customeTheme}
        style={{ width: size * 2, height: size * 2 }}
        strokeWidth="6"
        className="me-2"
      />
    </div>
  );
}

export default LoadingSpinner;
