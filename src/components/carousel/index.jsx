import { Carousel } from "primereact/carousel";
import { classNames } from "primereact/utils";

const GigCarousel = ({ images, gig }) => {
  const customTheme = {
    root: "flex flex-col w-full h-full object-cover object-center overflow-hidden",
    content: "flex flex-col w-full h-full object-cover object-center overflow-hideen ",
    container: ({ props }) => ({
      className: classNames("flex w-full h-full overflow-hidden relative", {
        "flex-row": props.orientation !== "vertical",
        "flex-col": props.orientation == "vertical",
      }),
    }),
    previousbutton: {
      className: classNames(
        "absolute left-[0%] z-10 !bg-[#404145] flex text-sm justify-center items-center self-center overflow-hidden  shrink-0 grow-0 ",
        `${
          gig ? "w-5 h-5 rounded-xxs" : "md:w-8 md:h-8 h-6 w-6 rounded-sm "
        } text-gray-600 border-0  transition duration-200 ease-in-out`
      ),
    },
    nextButton: {
        className: classNames(
          "absolute right-[0%] z-10 flex !bg-[#404145]   justify-center items-center self-center overflow-hidden  shrink-0 grow-0",
          `${
            gig ? "w-5 h-5 rounded-xxs" : "md:w-8 md:h-8 h-6 w-6 rounded-sm "
          } text-gray-600   border-0   transition duration-200 ease-in-out`
        ),
      },
    previousButtonIcon: {
      className: classNames(`text-white  ${gig ? "md:w-3 w-2 " : "md:w-4 w-3"}`),
    },
    nextButtonIcon: {
      className: classNames(`text-white ${gig ? "md:w-3 w-2 " : "md:w-4 w-3"}`),
    },
   
    itemscontent: "w-full h-full",
    itemscontainer: ({ props }) => ({
      className: classNames("flex  w-full  h-full object-cover object-center", {
        "flex-row": props.orientation !== "vertical",
        "flex-col": props.orientation == "vertical",
      }),
    }),
    item: ({ props }) => ({
      className: classNames("flex shrink-0 grow", {
        "w-full": props.orientation !== "vertical",
        "w-full ": props.orientation == "vertical",
      }),
    }),
    indicators: {
      className: classNames("flex flex-row justify-center flex-wrap"),
    },
    indicator: `mr-2 my-2 ${gig?"hidden":"md:block hidden"}`,
    indicatorbutton: ({ context }) => ({
      className: classNames(
        `md:w-8 h-2 w-6 ${gig?"hidden":"md:block hidden"} transition duration-200 rounded-0`,
        "focus:outline-none focus:outline-offset-0  foucs:ring-0",
        {
          "bg-gray-200 hover:bg-gray-300 ": !context.active,
          "bg-gray-500 hover:bg-gray-600": context.active,
        }
      ),
    }),
  };
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const productTemplate = (product) => {
    return (
      <div className="w-full h-full object-cover">
        <img src={product?.url} alt={"carousal"} />
      </div>
    );
  };

  return (
    <>
      <Carousel
        value={images}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        pt={customTheme}
        circular={true}
        //   autoplayInterval={3000}
      />
    </>
  );
};

export default GigCarousel;
