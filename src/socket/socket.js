import { createContext, useMemo, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SERVER } from "../contants/color";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useMemo(() => {
    if (isAuthenticated) {
      return io(SERVER, {
        withCredentials: true,
        query: {
          _id: user?._id,
        },
      });
    }
    return null;
  }, [isAuthenticated]);
  useEffect(() => {
    if (socket) {
      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });

    }
  }, [socket]);
  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("getOnlineUsers");

        socket.disconnect();
      }
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
