import axios from "axios";

export const logout = async (props) => {
  if (props.user) {
    window.open("http://localhost:7000/api/google/logout", "_self");
  }
  if (props.success || document.cookie.length !== 0) {
    await axios.post(
      "http://localhost:7000/api/logout",
      {},
      { withCredentials: true }
    );
  }
  window.location.reload();
};
