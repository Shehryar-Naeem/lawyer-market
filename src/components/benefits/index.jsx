import React from "react";
import LandingHeading from "../landing_heading";
import { lawyerBenefits } from "../../data";
import BenefitComp from "../benefitComp";

const Benefits = () => {
  return (
    <section
      data-aos="fade-up"
      className="container landing-pad-x landing-pad-y"
    >
      <LandingHeading text={"Pakistan Lawyer Market Place"} />

      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 place-items-center gap ">
        {lawyerBenefits.map((benefit, index) => (
          <BenefitComp key={index} benefit={benefit} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
