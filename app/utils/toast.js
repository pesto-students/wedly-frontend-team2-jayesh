import { toast } from "react-toastify";

const toastProperties = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const signinSuccessToast = () => {
  toast.success("Login Successful!", toastProperties);
};

export const signinFailureToast = () => {
  toast.error("Error Signing in!", toastProperties);
};

export const signupSuccessToast = () => {
  toast.info(
    "Signup Successful! Please check your email to verify your account!",
    toastProperties
  );
};

export const verifyEmailSuccessToast = () => {
  toast.success(
    "Email verification successful! Please login to continue.",
    toastProperties
  );
};

export const verifyEmailFailureToast = () => {
  toast.error(
    "Email verification was not successful! Please try again.",
    toastProperties
  );
};

export const signupFailureToast = () => {
  toast.error("Error Signing Up!", toastProperties);
};

export const signoutSuccessToast = () => {
  toast.success("Logged out Successfully!", toastProperties);
};

export const addEventSuccessToast = () => {
  toast.success("Event was successfully added!", toastProperties);
};

export const deleteEventSuccessToast = () => {
  toast.success("Event was successfully deleted!", toastProperties);
};

export const addMultipleEventsSuccessToast = () => {
  toast.success("Events were successfully added!", toastProperties);
};

export const remindEventSuccessToast = () => {
  toast.success("Reminders were succesfully sent!", toastProperties);
};

export const remindEventFailureToast = () => {
  toast.error("Reminders were not sent! Please try again", toastProperties);
};

export const signoutFailureToast = () => {
  toast.error("Logout failed!", toastProperties);
};

export const addEventFailureToast = () => {
  toast.error("Something went wrong! Please try again", toastProperties);
};

export const addMultipleEventsFailureToast = () => {
  toast.error("Something went wrong! Please try again", toastProperties);
};

export const deleteEventFailureToast = () => {
  toast.error("Something went wrong! Please try again", toastProperties);
};

export const addCoupleSuccessToast = () => {
  toast.success("Couple Details succesfully added!", toastProperties);
};

export const addCoupleFailureToast = () => {
  toast.error("Some error adding details. Please try again!", toastProperties);
};

export const addEinviteSuccessToast = () => {
  toast.success("Successfully saved!", toastProperties);
};

export const addEinviteFailureToast = () => {
  toast.error("Something went wrong. Please try again!", toastProperties);
};

export const inviteSuccessToast = () => {
  toast.success("Invite was successfully sent", toastProperties);
};

export const inviteFailureToast = () => {
  toast.error("Invite was not sent. Please try again", toastProperties);
};

export const paymentSucessToast = (amount) => {
  toast.success(`₹${amount} aashirvaad sent successfully!`, toastProperties);
};

export const paymentFailureToast = (amount) => {
  toast.error(`Aashirvaad was not sent! Please try again`, toastProperties);
};

export const addGuestSuccessToast = () => {
  toast.success(`Guest was succesfully added`, toastProperties);
};

export const addMultipleGuestsSuccessToast = () => {
  toast.success(`Guests were succesfully added`, toastProperties);
};

export const deleteGuestSuccessToast = () => {
  toast.success(`Guest was succesfully deleted!`, toastProperties);
};

export const updateGuestSuccessToast = () => {
  toast.success(`Guest was succesfully updated`, toastProperties);
};

export const addGuestFailureToast = () => {
  toast.error(`Guest was not added`, toastProperties);
};

export const addMultipleGuestsFailureToast = () => {
  toast.error(`Guests were not added`, toastProperties);
};

export const deleteGuestFailureToast = () => {
  toast.error(`Guest was not deleted!`, toastProperties);
};

export const updateGuestFailureToast = () => {
  toast.error(`Guest was not succesfully updated`, toastProperties);
};

export const updateEventSuccessToast = () => {
  toast.success(`Event was updated successfully`, toastProperties);
};

export const updateEventFailureToast = () => {
  toast.error(`Event was not updated!`, toastProperties);
};

export const custom401toast = (message) => {
  toast.error(`${message}`, toastProperties);
};
