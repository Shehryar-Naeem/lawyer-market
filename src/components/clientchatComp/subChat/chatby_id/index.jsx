import React, { Fragment, useEffect, useRef, useState } from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../../../../styles/StyledComponents";
import { orange } from "../../../../contants/color";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useInfiniteScrollTop } from "6pp";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetConversationQuery,
  useGetSingleConversationMessagesQuery,
  useSendMessageMutation,
} from "../../../../redux/api/userApi";
import Message from "../../message";
import { useDispatch, useSelector } from "react-redux";
import ChatLoading from "../../../skeletonLoading/chatloading";
import { useSocket } from "../../../../socket/socket";
import toast from "react-hot-toast";
import { getOtherUser } from "../../../../utils/helper";
const ClientChatById = () => {
  const { pathname } = useLocation();
  const [path, setPath] = useState("");
  const { id } = useParams();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [
    sendMessage,
    {
      isLoading: isSendingLoading,
      isError: isSendingError,
      error: sendingError,
    },
  ] = useSendMessageMutation();

  const { data, isLoading, isFetching, isError, error } =
    useGetSingleConversationMessagesQuery(id, {
      // pollingInterval: 30000,
      // refetchOnMountOrArgChange: 60,
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    });
  const { data: conversation } = useGetConversationQuery(id);

  const { user } = useSelector((state) => state.auth);

  // console.log("data", conversation);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
    if (conversation) {
      const receiverId = getOtherUser(conversation?.conversation, user._id);
      setReceiverId(receiverId);
    }
  }, [data]);

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      if (data.conversationId.toString() !== id.toString()) return;
      setMessages((prev) => [...prev, data.message]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length && messages[messages.length - 1].sender !== user._id;
    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: id,
        userId: user._id,
      });
    }

    socket.on("messagesSeen", ({ conversationId }) => {
      if (id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });
  }, [socket, user._id, messages, id]);

  useEffect(() => {
    if (pathname.indexOf("/lawyer-profile/chat/") !== -1) {
      setPath("lawyer-profile/chat");
    } else if (pathname.indexOf("/client-profile/chat") !== -1) {
      setPath("client-profile/chat");
    }
  }, [pathname]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const allMessages = oldMessages;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message can't be empty");
      return;
    }
    const data = {
      text: message,
    };

    const messageData = {
      sender: user._id,
      text: message,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, messageData]);
    socket.emit("newMessage", {
      message: messageData,
      conversationId: id,
      receiverId: receiverId,
      senderId: user._id,
    });
    setMessage("");

    try {
      await sendMessage({ id: id, data: data });
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Fragment>
      <Stack
        // ref={containerRef}
        boxSizing={"border-box"}
        // padding={"1rem"}
        spacing={"1rem"}
        // bgcolor={grayColor}
        position={"relative"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <div className="sticky top-0 w-full bg-gray-300 ">
          <Link
            to={`/${path}`}
            className="lg:p-1 md:p-0.10 p-0.8 bg-gray-100 inline-flex items-center h-full cursor-pointer"
          >
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <div className="px-0.10 mt-0 p-1 h-full overflow-y-auto overflow-x-hidden bg-gray-100 f-col gap-0.8 custom-scroll">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div className="f-col gap-0.5 w-full">
                <div
                  className=" w-[100px] h-[33px]  md:rounded-sm rounded-xs "
                  key={index}
                >
                  <Skeleton className="w-full h-full" />
                </div>
                <div
                  className=" w-[100px] ml-auto h-[33px]  md:rounded-sm rounded-xs "
                  key={index}
                >
                  <Skeleton className="w-full h-full" />
                </div>
              </div>
            ))
          ) : messages?.length > 0 ? (
            messages?.map((msg) => (
              <Message key={msg._id} message={msg} user={user} />
            ))
          ) : (
            <>
              <div className="item-center h-full w-full">
                <h1 className="lg:text-xl md:text-lg text-base lg:font-bold md:font-bold font-semibold">
                  No Messages
                </h1>
              </div>
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* {userTyping && <TypingLoader />} */}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          // padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: ".5rem",
              rotate: "30deg",
            }}
            // onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",

              bgcolor: "#7F8389",
              color: "white",
              marginLeft: "0.5rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#959B9B",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      {/* <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} /> */}
    </Fragment>
  );
};

export default ClientChatById;
