import React, { useEffect, useMemo, useState } from "react";
import { Images } from "../../../assets/images";
import { Outlet, useLocation } from "react-router-dom";
import { messageData } from "../../../data";
import ChatComp from "../chat";
import ClientChatComp from "../chat";
import { useMeConversationsQuery } from "../../../redux/api/userApi";
import toast from "react-hot-toast";
import ChatLoading from "../../skeletonLoading/chatloading";
import { useSocket } from "../../../socket/socket";
import { isIncludeInOnlineUsers } from "../../../contants/helper";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../redux/reducer/conversation";
import { idID } from "@mui/material/locale";

const ClientChat = () => {
  const { onlineUsers, socket } = useSocket();

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const [path, setPath] = React.useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError, isFetching, error } =
    useMeConversationsQuery();
  const { pathname } = useLocation();

  // console.log("data", data);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);
  useEffect(() => {
    if (pathname.indexOf("/lawyer-profile/chat") !== -1) {
      setPath("lawyer-profile/chat");
    } else if (pathname.indexOf("/client-profile/chat") !== -1) {
      setPath("client-profile/chat");
    }
  }, [pathname]);

  useEffect(() => {
    socket.on("newMessageNotification", (data) => {
      const { conversationId } = data;
      dispatch(setNotification({ conversationId }));
    });

    return () => {
      socket.off("newMessageNotification");
    };
  }, [socket]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log("data", data?.conversations);
  const filteredConversations = useMemo(() => {
    if (!data?.conversations) return [];

    return data?.conversations?.filter((conversation) =>
      conversation.otherMember.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [data?.conversations, searchInput]);
  return (
    <div className="bg-gray-100 h-full md:p-1 p-0.10">
      <div className="flex gap max-h-[550px] min-h-[440px] overflow-hidden h-full relative">
        <div
          className={`${
            open
              ? "transition-all lg:translate-x-0 -translate-x-full z-[99] lg:relative absolute top-0 left-0 h-full max-w-full  bg-white md:min-w-[250px] md:shadow-lg shadow-md "
              : "transition-all lg:translate-x-0 lg:relative absolute z-[99] top-0 left-0 h-full max-w-full  bg-white md:min-w-[250px] md:shadow-lg  shadow-md"
          } `}
        >
          <div className="f-col w-full justify-between h-full gap md:p-0.8 p-0.5">
            <form
              className="sticky top-[8px] bg-white md:rounded-sm rounded-xs w-full"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                name="all"
                // value={inputValue.all}
                type="text"
                className="w-full md:p-0.8 px-0.5 text-[1rem] border border-gray-400 md:rounded-sm  rounded-xs outline-none focus:ring-0"
                placeholder="search..."
                aria-label="Search"
                // onChange={handleFilterChange}
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </form>
            <div className="f-col h-full gap overflow-auto custom-scroll">
              {isFetching ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ChatLoading key={index} />
                ))
              ) : filteredConversations?.length > 0 ? (
                filteredConversations?.map((data, index) => (
                  <>
                    <ClientChatComp
                      _id={data._id}
                      index={index}
                      path={path}
                      setOpen={setOpen}
                      data={data}
                      open={open}
                      isOnline={isIncludeInOnlineUsers(
                        onlineUsers,
                        data.otherMember._id
                      )}
                      notification={notifications[data._id]}
                    />
                  </>
                ))
              ) : (
                <>
                  <div className="item-center h-full w-full">
                    <h1 className="lg:text-xl md:text-lg text-base lg:font-bold md:font-bold font-semibold">
                      No chat
                    </h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="h-full f-col gap bg-white w-full overflow-auto md:shadow-lg">
          <button
            className="text-black flex focus:outline-none lg:hidden justify-end p-0.5  w-full bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="f-col h-full  gap md:p-0.8 p-0.5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
