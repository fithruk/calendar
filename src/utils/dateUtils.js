export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(":");
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const setRoundMinutes = (minutes) => {
  if (minutes <= 14) {
    alert(
      "Minutes should be a multiple of 15, it gonna be set automatically to 0"
    );
    return 0;
  } else if (minutes >= 16 && minutes <= 29) {
    alert(
      "Minutes should be a multiple of 15, it gonna be set automatically to 15"
    );
    return 15;
  } else if (minutes >= 31 && minutes <= 44) {
    alert(
      "Minutes should be a multiple of 15, it gonna be set automatically to 30"
    );
    return 30;
  } else if (minutes >= 46 && minutes <= 59) {
    alert(
      "Minutes should be a multiple of 15, it gonna be set automatically to 45"
    );
    return 45;
  }
};

export const setFormatPropertyMinutes = (name, time) => {
  if (name === "dateFrom" || name === "dateTo") {
    const houres = time.substring(0, 3);
    const minutes = time.substring(3);
    return `${houres}${setRoundMinutes(minutes)}`;
  }
};
