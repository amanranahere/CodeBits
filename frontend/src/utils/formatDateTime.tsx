export const formatDateTime = (
  isoString: string
): { full: string; relative: string } => {
  const date = new Date(isoString);

  //   format date as DD/MM/YYYY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  //   format HH:MM:SS AM/PM
  const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  const full = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;

  //   relative time
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let relative = "";
  if (diffSeconds < 60) {
    relative = `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
  } else if (diffMinutes < 60) {
    relative = `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    relative = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else {
    relative = `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }

  return { full, relative };
};
