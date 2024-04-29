import { Box, Typography, capitalize } from "@mui/material";
import React, { memo } from "react";
// import { lightBlue } from "../../constants/color";
import moment from "moment";
// import { fileFormat } from "../../lib/features";
// import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";
import { lightBlue } from "../../../contants/color";
import { CaptializeFirstLetter } from "../../../utils/helper";
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";

const Message = ({ message, user }) => {
  // console.log(message);
  const { sender, text, createdAt, seen } = message;

  const sameSender = sender === user?._id;

  //   console.log("message", message);
  const timeAgo = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "4px",
        padding: "0.3rem",
        paddingBottom: "0.1rem",
        display: "flex",

        flexDirection: "column",
        gap: "0.1rem",
        width: "fit-content",
        maxWidth: "250px",

        textWrap: "wrap",
        wordBreak: "break-word",
      }}
      key={message._id}
    >
      {text && (
        <span className="text-[12px] leading-none font-medium text-black">
          {CaptializeFirstLetter(text)}
        </span>
      )}

      {/* {attachments.length > 0 &&
      attachments.map((attachment, index) => {
        const url = attachment.url;
        const file = fileFormat(url);

        return (
          <Box key={index}>
            <a
              href={url}
              target="_blank"
              download
              style={{
                color: "black",
              }}
            >
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );
      })} */}
      <div className="flex gap-1 items-center justify-between">
        <div>
          {seen ? (
            <div className="text-base text-blue-500 ">
              <TiTick />
            </div>
          ) : (
            <div className="text-base text-gray-600 ">
              <TiTickOutline />
            </div>
          )}
        </div>
        <span
          variant="caption"
          color={"text.secondary"}
          className="text-[8px] font-black"
        >
          {timeAgo}
        </span>
      </div>
    </motion.div>
  );
};

export default Message;
