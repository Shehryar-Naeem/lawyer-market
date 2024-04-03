import React, { useState } from "react";
import Stepper from "../../../components/Stepper";
import { Editor } from "primereact/editor";

const GigStepOne = () => {
  const [text, setText] = useState(
    "<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>"
  );

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
  return (
    <div className="page-container">
      <div className="container">
        <div className="lg:pt-10 md:pt-8 pt-6 f-col lg:gap-1 md:gap-0.10 gap-0.8">
          <div className="bg-white shadow-xl lg:p-4xl md:p-3xl p-3xl">
            <Stepper />
          </div>
          <div className="f-col bg-white shadow-xl lg:p-ly-pad md:p-3xl p-3xl lg:gap-0.10 md:gap-0.8 gap-sm">
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-0.8 gap-sm place-items-center">
              <div className="w-full lg:gap-0.10 md:gap-0.8 gap-sm f-col">
                <label className="capitalize text-black lg:text-xl md:text-lg text-base lg:font-black md:font-extrabold font-bold">
                  Gig Title
                </label>
                <textarea
                  type="text"
                  name="name"
                  rows={2}
                  id="name"
                  className="bg-gray-50 border resize-none text-gray-900 small-btn-border-radius focus:ring-primary focus:border-primary block md:text-base text-sm md:font-semibold font-normal w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="w-full f-col lg:gap-0.10 md:gap-0.8 gap-sm">
                <h3 className="capitalize text-gray-500 text-center md:text-lg text-base  md:font-bold font-medium">
                  Example title
                </h3>
                <ol className="row-span-full f-col md:gap-0.5 list-disc md:pl-ly-pad px-md-ly-pad md:text-base text-sm md:font-semibold font-medium text-black">
                  <li>
                    Provide legal representation in Courtroom advocate (civil &
                    criminal)
                  </li>
                  <li>Manage regulatory and compliance-related services</li>
                  <li>Building a case through public records research.</li>
                  <li>Settling disputes and supervising any agreements</li>
                  <li>
                    Defend or prosecute clients by presenting evidence in
                    litigation.
                  </li>
                </ol>
              </div>
            </div>
            <div className="f-col lg:gap-0.10 md:gap-0.8 gap-sm f-col">
              <label className="capitalize text-black lg:text-xl md:text-lg text-base lg:font-black md:font-extrabold font-bold">
                discription
              </label>
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                headerTemplate={header}
                style={{ height: "320px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigStepOne;
