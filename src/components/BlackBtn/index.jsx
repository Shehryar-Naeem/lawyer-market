import React from "react";
import Loader from "../loader";

const BlackBtn = ({ text, loading }) => {
  return (
    <button type="submit" value={text} className="black-btn">
      {loading ? (
        <Loader/>
      ) : (
         text
      )}
    </button>
  );
};

export default BlackBtn;
