export const getAuthLocal = () => {
  if (typeof localStorage !== "undefined" && localStorage !== null) {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    return auth;
  }
  return null;
};
