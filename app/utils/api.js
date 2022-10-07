import axios from "axios";

export const logout = async (success, user) => {
  if (user) {
    window.open(`${process.env.SERVER_URL}/google/logout`, "_self");
  }
  if (success || document.cookie.length !== 0) {
    await axios.post(
      `${process.env.SERVER_URL}/logout`,
      {},
      { withCredentials: true }
    );
  }
  window.location.reload();
};

export const getUser = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/google/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    if (response.status === 200) {
      const resObject = await response.json();
      if (!resObject.user.local) {
        return resObject.user;
      }
      return null;
    } else {
      throw new Error("authentication has been failed!");
    }
  } catch (err) {
    console.log(err);
  }
};
