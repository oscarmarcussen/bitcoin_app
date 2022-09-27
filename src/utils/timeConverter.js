export const timeConverter = (unixTime) => {
  const date = new Date(unixTime * 1000); //convert to milliseconds

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  const formattedToday = day + "/" + month + "/" + year;
  return formattedToday;
};
