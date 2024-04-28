import React, { Fragment, useEffect, useState } from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../../../../styles/StyledComponents";
import { orange } from "../../../../contants/color";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetSingleConversationMessagesQuery, useSendMessageMutation } from "../../../../redux/api/userApi";
const ClientChatById = () => {
  const {pathname} = useLocation();
  const [path, setPath] = useState("")
  const {id} = useParams()
  const [sendMessage,{isLoading:isSendingLoading,isError:isSendingError,error:sendingError}]=useSendMessageMutation()
  const {data,isLoading,isFetching,isError,error}= useGetSingleConversationMessagesQuery(id)
  useEffect(() => { 
    if(pathname.indexOf("/lawyer-profile/chat/") !== -1){
      setPath("lawyer-profile/chat")
    }else if(pathname.indexOf("/client-profile/chat")!== -1){
      setPath("client-profile/chat")
    }
  }, [pathname]);



  

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
        <div className="absolute top-0 w-full bg-gray-300 ">
          <Link
            to={`/${path}`}
            className="lg:p-1 md:p-0.10 p-0.8 bg-gray-100 inline-flex items-center h-full cursor-pointer"
          >
            <IoMdArrowRoundBack />
          </Link>
        </div>
        {/* {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))} */}

        {/* {userTyping && <TypingLoader />} */}

        {/* <div ref={bottomRef} /> */}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        // onSubmit={submitHandler}
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
            // value={message}
            // onChange={messageOnChange}
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
