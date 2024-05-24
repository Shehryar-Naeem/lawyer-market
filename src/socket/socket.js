import { createContext, useMemo, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { SERVER } from "../contants/color";
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
    
   
      return io("http://localhost:7012/", {
        withCredentials: true,
        query: {
          _id: user?._id,
        },
      });
      // return io("https://lawyer-backend-production-5a92.up.railway.app/", {
      //   withCredentials: true,
      //   query: {
      //     _id: user?._id,
      //   },
      // });
    }
    return null;
  }, [isAuthenticated,user?._id]);
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
