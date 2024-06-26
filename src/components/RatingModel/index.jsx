import React, { useEffect } from "react";
import { Button, Flowbite, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";
import Loader from "../loader";
import { set } from "react-hook-form";

const RatingModel = ({
  openModal,
  setOpenModal,
  title,
  isReviewloading,
  children,
  handleSubmit,
  addReviewHandler,
  onClear,
  reset,
}) => {
  useEffect(() => {
    return () => {
      onClear();
      reset();
    };
  }, []);

  const customTheme = {
    modal: {
      root: {
        base: "fixed inset-x-0 top-0 z-[999] backdrop-blur-sm h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
        show: {
          on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
          off: "hidden",
        },
        sizes: {
          sm: "max-w-sm",
          md: "max-w-md",
          lg: "max-w-lg",
          xl: "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl",
        },
        positions: {
          "top-left": "items-start justify-start",
          "top-center": "items-start justify-center",
          "top-right": "items-start justify-end",
          "center-left": "items-center justify-start",
          center: "items-center justify-center",
          "center-right": "items-center justify-end",
          "bottom-right": "items-end justify-end",
          "bottom-center": "items-end justify-center",
          "bottom-left": "items-end justify-start",
        },
      },
      content: {
        base: "relative h-full w-full p-4 h-auto",
        inner:
          "bg-white dark:bg-gray-800 dark:text-white rounded-sm shadow-lg pop-animation",
      },
      header: {
        base: "flex items-center justify-between rounded-t border-gray-400 border-b general-pad ",
        popup: " border-b-0",
        title:
          " capitalize item-center lg:text-xl  md:text-base text-sm font-bold text-gray-900 dark:text-white",
        close: {
          base: "outline-none ml-auto inline-flex items-center rounded-md bg-transparent md:p-[10px] p-[6px] text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          icon: "md:w-5 md:h-5 w-3 h-3 fill-current",
        },
      },
      body: {
        base: "general-pad flex-1 overflow-auto bg-gray-100",
        popup: "pt-0",
      },
      footer: {
        base: "item-center space-x-2 rounded-b border-gray-400 general-pad ",
        popup: "border-t",
      },
    },
  };
  //   const cancelHandler = () => {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (user) {
  //       dispatch(userExist(user));
  //       localStorage.removeItem("user");
  //       setOpenModal(!openModal);
  //       navigate("/gigs");
  //     }
  //   };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        // popup dismissible
        size={"sm"}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit(addReviewHandler)}
              className=" p-2.5 uppercase tex-center bg-black lg:rounded-sm md:rounded-xs rounded-xxs enabled:focus:ring-0 enabled:hover:bg-black-90 text-white text-sm font-bold "
              //   onClick={createLaywerHandler}
            >
              {/* {createLawyerLoading ? (
                <Loader/>
              ) : (
                "Create"
              )} */}
              {isReviewloading ? <Loader /> : "rate it"}
            </button>
            <button
              onClick={onClear}
              className="p-2.5 uppercase tex-center lg:rounded-sm md:rounded-xs rounded-xxs bg-gray-500 enabled:focus:ring-0 enabled:hover:bg-gray-400 text-white text-sm font-bold "
            >
              clear
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Flowbite>
  );
};

export default RatingModel;
