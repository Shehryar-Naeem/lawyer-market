import React, { useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import BlackBtn from "../../../components/BlackBtn";
import { lawyerCategories } from "../../../data";
import PageHeading from "../../../components/pageHeading";

const GigStepOne = () => {
  const [text, setText] = useState("");

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };
  const header = renderHeader();

  const customCheckbox = {
    root: "cursor-pointer inline-flex",
    input: ({ props, context }) => ({
      className: [
        "flex items-center justify-center",
        "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
        {
          "border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900":
            !context.checked,
          "border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400":
            context.checked,
        },
        {
          "hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        },
      ],
    }),
  };
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-2 md:gap-1.5 gap-1">
          <div className="bg-white md:shadow-lg shadow-md lg:p-4xl md:p-3xl p-3xl">
            <Stepper step={0} />
          </div>
          <PageHeading text="basic gig info" />

          <div className="f-col md:shadow-lg shadow-md bg-white lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-0.8 gap-sm place-items-end">
              <div className="w-full lg:gap-0.10 md:gap-0.8 gap-sm f-col justify-between">
                <label className="gig-label">Gig Title</label>
                <div className="relative">
                  <span className="xl:text-xl lg:text-lg md:text-base text-sm  md:font-extrabold font-bold absolute md:p-0.8 p-0.5 translate-y-0">
                    I will
                  </span>
                  <textarea
                    type="text"
                    name="name"
                    rows={2}
                    placeholder="be your"
                    id="name"
                    className="text-input"
                  />
                </div>
              </div>
              <div className="w-full f-col lg:gap-0.10 md:gap-0.8 gap-sm">
                <h3 className="capitalize text-gray-500 text-center md:text-lg text-base md:font-semibold font-bold">
                  Example title
                </h3>
                <ol className="row-span-full f-col md:gap-0.5 list-disc md:pl-ly-pad px-md-ly-pad md:text-base text-sm md:font-semibold font-medium text-black">
                  <li>Be Your Lawyer That will represent you in Court</li>
                  <li>Be Your Lawyer for Bail</li>
                  <li>Represent you in court for Ownership of Car</li>
                  <li>Settling disputes and supervising any agreements</li>
                  <li>
                    Defend or prosecute clients by presenting evidence in
                    litigation.
                  </li>
                </ol>
              </div>
            </div>
            <div className="lg:gap-0.10 md:gap-0.8 gap-sm f-col">
              <label className="gig-label">discription</label>
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                headerTemplate={header}
                style={{ height: "320px" }}
              />
            </div>
            <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm ">
              <label className="gig-label">Category</label>
              <ul class="w-full overflow-hidden lg:p-1 md:p-0.10 p-0.8 small-btn-border-radius text-sm font-medium  text-gray-900 bg-white border-1 border-black flex flex-wrap">
                {lawyerCategories.map((category) => (
                  <li
                    class="border-b border-gray-400 md:w-2/4 w-full"
                    key={category.id}
                  >
                    <div class="flex items-center lg:p-1 md:p-0.10 p-0.8 gap ">
                      <input
                        id={category.name}
                        type="checkbox"
                        name={category.name}
                        value={category.name}
                        className="md:w-6 md:h-6 w-4 h-4 bg-gray-300 border-gray-600 md:border-2 border-1 focus:ring-gray-500 md:focus:ring-2 focus:ring-1 md:rounded-xs rounded-xxs checked:bg-black lg:text-2xl md:text-xl text-base"
                      />
                      <label
                        htmlFor={category.name}
                        className="caplitalize inline-flex lg:text-lg md:text-base text-sm md:font-bold font-semibold text-gray-900 dark:text-gray-300"
                      >
                        {category.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-end justify-end">
              {/* <BlackBtn text="save and continue" /> */}
              <button
                type="submit"
                className="gig-btn"
              >
                save and continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigStepOne;
