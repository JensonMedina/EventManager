import { createContext } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZ2l2ZW5fbmFtZSI6ImplbnNvbiIsIm5iZiI6MTcyOTAwMzc5MiwiZXhwIjoxNzI5MDkwMTkyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNDIiLCJhdWQiOiJBbnlvbmUifQ.NdepXH2fPzsXthswC4_IbUSFjTr7junVXyZhL4ICOq4";

  const GetAllEvents = async () => {
    try {
      const response = await fetch("https://localhost:7299/api/Event", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const GetEventById = async (eventId) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Event/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
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

  const DeleteEvent = async (idEvent) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Event/${idEvent}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      if (response.status === 204) {
        // No Content: Devolvemos true porque se eliminó correctamente.
        return true;
      }

      // Si no es 204, intentamos convertir la respuesta a JSON.
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar el evento: ", error);
      return null;
    }
  };

  const AddParticipant = async (eventId, participants) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/events/Participant/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          body: JSON.stringify(participants),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al agregar participante:", error);
      return null;
    }
  };
  const GetParticipants = async (eventId) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/events/Participant/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los participantes:", error);
      return null;
    }
  };
  const AddTask = async (eventId, listTask) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Task/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          body: JSON.stringify(listTask),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al agregar la tarea: ", error);
      return null;
    }
  };
  const data = {
    GetAllEvents,
    GetEventById,
    AddEvent,
    UpdateEvent,
    DeleteEvent,
    AddParticipant,
    GetParticipants,
    AddTask,
  };
  return <EventContext.Provider value={data}>{children}</EventContext.Provider>;
};

export default EventProvider;
