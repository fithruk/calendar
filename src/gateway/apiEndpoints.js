const link = "https://636b6df9ad62451f9fb14be5.mockapi.io/api/v1/events/";

const getAllEvents = async () => {
  const res = await fetch(link);

  return res.ok && res.json();
};

const addNewEvent = async (newTask) => {
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  return res.ok && res.json();
};

const deleteDeprecatedEvent = async (id) => {
  const res = await fetch(`${link}${id}`, {
    method: "DELETE",
  });

  return res.ok && res.json();
};

export { getAllEvents, addNewEvent, deleteDeprecatedEvent };
