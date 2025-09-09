export const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";

  try {
    const date = new Date(dateString);

    // Options for formatting
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short", // "Jan", "Feb", "Mar" ...
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-IN", options);
  } catch (error) {
    console.error("Invalid date:", dateString);
    return "Invalid Date";
  }
};
