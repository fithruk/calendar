const link = "https://calendarserver.onrender.com";
// const link = "http://localhost:5000";

const getAllEvents = async (headers) => {
  const res = await fetch(`${link}/calendar`, { headers });

  return res.ok && res.json();
};

const addNewEvent = async (newTask, token) => {
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${link}/calendar/addEvent`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(newTask),
  });

  return res.ok && res.json();
};

const registration = async (body) => {
  const res = await fetch(`${link}/auth/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
    credentials: "include",
  });

  return res.ok && res.json();
};

const login = async (body) => {
  const res = await fetch(`${link}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return res.ok && res.json();
};

const logout = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const res = await fetch(`${link}/auth/logout`, {
    headers,
    credentials: "include",
  });

  return res.ok && res.json();
};

const deleteDeprecatedEvent = async (id, token) => {
  const headers = { authorization: `Bearer ${token}` };
  const res = await fetch(`${link}/calendar/deleteEvent/${id}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  return res.ok && res.json();
};

export {
  getAllEvents,
  addNewEvent,
  deleteDeprecatedEvent,
  registration,
  login,
  logout,
};
