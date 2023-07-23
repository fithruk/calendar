const dataValidate = (dateStart, dateEnd, dateOfEvent, arrEvenst) => {
  const errors = [];
  let duration = dateEnd.getHours() - dateStart.getHours();

  if (duration > 6) {
    errors.push({
      msg: "Event can not be longer then 6 hours, you have to cut it",
    });
  }
  if (dateOfEvent < new Date()) {
    errors.push({
      msg: "Your event have to be in a future, set properly date",
    });
  }
  if (arrEvenst.length > 0) {
    arrEvenst.forEach((event) => {
      if (dateOfEvent.getDate() === new Date(event.date).getDate()) {
        if (
          (dateStart < new Date(event.dateFrom) &&
            dateEnd > new Date(event.dateTo)) ||
          (dateStart < new Date(event.dateFrom) &&
            dateEnd > new Date(event.dateFrom)) ||
          dateStart.getHours() === new Date(event.dateFrom).getHours()
        ) {
          errors.push({
            msg: `This time slot :${event.title} is busy or the previous event has not ended yet`,
          });
        }
      }
    });
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
};

const inputValidator = (email) => {
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  } else {
    return true;
  }
};

export { dataValidate, inputValidator };
