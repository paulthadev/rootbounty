import { formatDistanceToNow } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";

  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  return (
    distance
      .replace("minute", "min")
      .replace("minutes", "min")
      .replace("hour", "hr")
      .replace("hours", "hrs")
      // .replace("day", "d")
      // .replace("days", "d")
      .replace("month", "mo")
      .replace("months", "mo")
      .replace("year", "yr")
      .replace("years", "yrs")
      .replace(" ago", "")
  );
};
