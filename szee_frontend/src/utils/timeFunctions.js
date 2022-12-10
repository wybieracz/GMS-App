export function getTimeString(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const yearString = year > 10 ? `${year}` : `0${year}`;
  const monthString = month > 9 ? `${month + 1}` : `0${month + 1}`;
  const dayString = day > 10 ? `${day}` : `0${day}`;
  const hourString = hour > 10 ? `${hour}` : `0${hour}`;
  const minuteString = minute > 10 ? `${minute}` : `0${minute}`;

  return `${hourString}:${minuteString} ${dayString}.${monthString}.${yearString}`
}

export function getUnixStamp(hours, minutes) {
  return Math.round(Date.now() / 1000) + hours * 60 * 60 + minutes * 60;
}