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
};

export function timestampToDate(timestamp: string | number | Date) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export function formatDateString(originalDate: string) {
  const formattedDate = new Date(originalDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });
  return formattedDate;
};

export const formatDateToDDMMYYYY = (inputDate: string | number | Date) => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
};
