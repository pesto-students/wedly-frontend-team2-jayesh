export const getMinDate = () => {
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  let minDate = year + "-" + month + "-" + day;
  return minDate;
};

export const getTodaysDate = () => {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  return `${year}-${month}-${date}`;
};

export const getTime = () => {
  let today = new Date();
  let hr = today.getHours() + 2;
  let min = today.getMinutes();
  return `${hr}:${min}`;
};
