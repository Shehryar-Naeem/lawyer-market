export const CaptializeFirstLetter = (string) => {
  if (string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    // Do something with character
  } else {
    return "hello";
  }
};
