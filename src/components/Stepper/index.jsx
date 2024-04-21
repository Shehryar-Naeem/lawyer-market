import React, { useState } from "react";
import { Steps } from "primereact/steps";
import { classNames } from "primereact/utils";

export default function TemplateDemo({step}) {
  const [activeIndex, setActiveIndex] = useState(step);

  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem ? "#000000" : "#D9D9D9";
    const textColor = isActiveItem
      ? "var(--surface-b)"
      : "var(--text-color-secondary)";
    const labletextColor = isActiveItem ? "#000000" : "#D9D9D9";

    return (
      //   <span
      //     className="fle"
      //     style={{ backgroundColor: backgroundColor, color: textColor }}
      //     onClick={() => setActiveIndex(itemIndex)}
      //   >
      //     {/* <i className={`${item.icon} text-xl`} /> */}
      //     {
      //         item.icon
      //     }
      //   </span>

      <div className="f-col lg:gap-1 md:gap-0.10 gap-0.8 item-center">
        <span
          className="z-10 lg:w-[2rem] lg:h-[2rem] md:w-[1.7rem] md:cursor-pointer cursor-none md:h-[1.7rem] w-[1.4rem] h-[1.4rem] item-center rounded-full lg:text-lg md:text-base text-sm lg:font-bold md:font-medium font-semibold text-center"
          style={{ backgroundColor: backgroundColor, color: textColor }}
        >
          {item.data}
        </span>
        <span
          className="lg:text-lg md:text-base text-sm lg:font-bold md:font-medium font-semibold text-center"
          style={{ color: labletextColor }}
        >
          {itemIndex === 0 ? "Step 1" : itemIndex === 1 ? "Step 2" : "Step 3"}
        </span>
      </div>
    );
  };

  const items = [
    {
      data: "1",
      template: (item) => itemRenderer(item, 0),
    },
    {
      data: "2",
      template: (item) => itemRenderer(item, 1),
    },
    {
      data: "3",
      template: (item) => itemRenderer(item, 2),
    },
  ];
  const customTheme = {
    root: "relative",
    menu: "p-0 m-0 list-none flex",
    menuitem: {
      className: classNames(
        "relative flex justify-center flex-1 ",
        "before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2"
      ),
    },
    // action: {
    //     className: classNames(
    //         'inline-flex flex-col items-center ',
    //         'transition-shadow rounded-md bg-white dark:bg-transparent',
    //         'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
    //     )
    // },
    // step: {
    //     className: classNames('flex items-center justify-center', 'text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900 w-[2rem] h-[2rem] leading-2rem text-sm z-10 rounded-full')
    // },
    // label: {
    //     className: classNames('block', 'whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full', 'mt-2 text-gray-500 dark:text-white/60')
    // }
  };

  return (
    <div className="card">
      <Steps model={items} activeIndex={activeIndex} pt={customTheme} unstyled={true} />
    </div>
  );
}
