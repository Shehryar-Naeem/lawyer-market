import React from "react";
import "./index.css";
import { Images } from "../../assets/images";
const HeroSection = () => {
  return (
    <section class="hero_container landing-pad-x landing-pad-y">
      <div class="hero_content__container">
        <h1 className="text-grey" data-aos="fade-down">
          Revolutionizing the
          <br />
          <span class="heading__1 text-gray-600">Legal Marketplace</span>
          <br />
          <span class="heading__2 text-gray-500">in the Pakistan</span>
        </h1>
        <p
          data-aos="zoom-in"
          className="lg:text-lg md:text-balance text-sm font-medium text-gray-500 tracking-wider leading-tight"
        >
          Our platform features verified lawyers who are Bar Association
          members, ensuring high standards of practice, ethics, and professional
          integrity. With fast response times for urgent matters, access to
          multiple and specialized lawyers, and a commitment to exceptional
          services, we connect you with highly qualified legal professionals
          dedicated to personalized solutions and optimal outcomes.
        </p>
        {/* <form>
          <input type="text" placeholder="What do you want to learn" />
          <button type="submit">Search gigs</button>
        </form> */}
      </div>
      <div class="image__container">
        <img src={Images.hero4} alt="header" />
        <img src={Images.hero5} alt="header" data-aos="zoom-in-up" />
        <div class="image__content">
          <ul>
            <li>Quick resolution for urgent legal matter</li>
            <li>Easy Access to Top Lawyers</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
