export function getDateTime24H() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const shortDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return shortDate;
}