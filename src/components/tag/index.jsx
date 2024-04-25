import React from "react";
import { CaptializeFirstLetter } from "../../utils/helper";

const Tag = ({cat,index}) => {
  return (
    <li key={index} className="tag-text">
      {CaptializeFirstLetter(cat)}
    </li>
  );
};

export default Tag;
