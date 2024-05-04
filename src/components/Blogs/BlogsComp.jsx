import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/tajmahal.jpg";
import Img2 from "../../assets/places/water.jpg";
import Img3 from "../../assets/places/boat.jpg";
import { Images } from "../../assets/images";

const BlogsData = [
  {
    id: 1,
    path:"https://comradeweb.com/blog/digital-marketing-for-lawyers-hows-and-whys/",
    image: Images.blog1,
    title: "What Is Digital Marketing for Attorneys and Law Firms?",
    description:
      "Digital marketing for law firms is the act of selling services online. It refers to advertising on search engines, websites, social media, and mobile apps at a high level. ",
    author: "Someone",
    date: "MARCH 13, 2024",
  },
  {
    id: 2,
    path:"https://mdlaw.com.au/news-insights/things-to-look-for-when-choosing-a-lawyer/",
    image: Images.blog2,
    title: "Five Things to Look for When Choosing a Lawyer",
    description:
      "A lawyer will act as your advocate, often in very sensitive situations. You want to ensure that whoever represents you is doing the best job possible. You must carefully choose your lawyer and legal service for you. We have put together a list of different points to consider when you are in the process of choosing a lawyer.",
    author: "Someone",
    date: "December 1, 2022",
  },
  {
    id: 1,
    path:"https://www.crowdspring.com/blog/legal-mistakes",
    image: Images.blog3,
    title: "35 Legal Mistakes Every Startup and Growing Business Must Avoid",
    description:
      "Consult a legal expert when deciding on a business structure. Regularly update organizational documents as your business evolves.Conduct annual reviews to ensure compliance with all required formalities.",
    author: "Someone",
    date: "Mar 20, 2024",
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container landing-pad-x landing-pad-y ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Our Latest Blogs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;
