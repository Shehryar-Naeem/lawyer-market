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
