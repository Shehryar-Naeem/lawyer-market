import axios from "axios";

export const CaptializeFirstLetter = (string) => {
  if (string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    // Do something with character
  } else {
    return "hello";
  }
};

export const fetchUserData = async () => {
  try {
    const { data } = await axios.get("/api/user/get-profile");
    return data;
  } catch (error) {
    return error.data.response.message;
  }
};

export const options = {
  pollingInterval: 6000,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
};

export const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export const getOtherUser = (conversation, userId) => {
  return conversation.participants.senderId.toString() === userId.toString()
    ? conversation.participants.receiverId
    : conversation.participants.senderId;
};
