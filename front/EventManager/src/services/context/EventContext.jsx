import { createContext } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZ2l2ZW5fbmFtZSI6ImplbnNvbiIsIm5iZiI6MTcyODQ4MDQ5MiwiZXhwIjoxNzI4NTY2ODkyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNDIiLCJhdWQiOiJBbnlvbmUifQ.ewgolkdQy7wcLjPBBrCldOcO4LnTcRi2jCwRbftoWpA";

  const GetAllEvents = async () => {
    try {
      const response = await fetch("https://localhost:7299/api/Event", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inserta tu token aquí
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
      return null;
    }
  };

  const GetEventById = async (id) => {
    const response = await fetch(`http://localhost:3000/events/${id}`);
    const data = await response.json();
    return data;
  };

  const AddEvent = async (event) => {
    try {
      const response = await fetch(
        "https://localhost:7299/api/Event/CreateEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          body: JSON.stringify(event),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear el evento:", error);
      return null;
    }
  };

  const UpdateEvent = async (event) => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  };

  const DeleteEvent = async (id) => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  const data = {
    GetAllEvents,
    GetEventById,
    AddEvent,
    UpdateEvent,
    DeleteEvent,
  };
  return <EventContext.Provider value={data}>{children}</EventContext.Provider>;
};

export default EventProvider;
