import React from "react";
import { Button, Flowbite, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
const CustomModal = ({
  openModal,
  setOpenModal,
  title,
  children,
  createLaywerHandler,
  createLawyerLoading,
}) => {
  const customTheme = {
    modal: {
      content: {
        base: "relative h-full w-full p-4 h-auto",
        
      },
      header: {
        base: "flex items-center justify-between rounded-t border-gray-400 border-b lg:p-5 md:p-4 p-3 ",
        popup: " border-b-0",
        title:
          " capitalize item-center lg:text-xl  md:text-base text-sm font-bold text-gray-900 dark:text-white",
        close: {
          base: "outline-none ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          icon: "md:w-5 md:h-5 w-4 h-4 fill-current",
        },
      },
      body: {
        base: "p-6 flex-1 overflow-auto bg-gray-100",
        popup: "pt-0",
      },
      footer: {
        base: "item-center space-x-2 rounded-b border-gray-400 p-5 dark:border-gray-600",
        popup: "border-t",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        // popup dismissible
        size={"sm"}
        className="animate-fade-in"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4">
            <Button
              size="xs"
              className="!px-0 !py-0 uppercase bg-black lg:rounded-sm md:rounded-xs rounded-xxs enabled:focus:ring-0 enabled:hover:bg-black-90"
              onClick={createLaywerHandler}
            >
              {createLawyerLoading ? (
                <div className="animate-spin h-6 w-6  border-t-4 border-b-4 border-white rounded-full"></div>
              ) : (
                "Create"
              )}
            </Button>
            <Link to={"/user-profile"}>
              <Button
                size="xs"
                className="!px-0 !py-0 uppercase lg:rounded-sm md:rounded-xs rounded-xxs bg-gray-500 enabled:focus:ring-0 enabled:hover:bg-gray-400"
              >
                cancel
              </Button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </Flowbite>
  );
};

export default CustomModal;
