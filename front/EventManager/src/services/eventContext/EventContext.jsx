import { createContext } from "react";
import { useState } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const getToken = () => localStorage.getItem("token");

  const GetAllEvents = async () => {
    try {
      const response = await fetch("https://localhost:7299/api/Event", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
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
            Authorization: `Bearer ${getToken()}`,
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
            Authorization: `Bearer ${getToken()}`,
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

  const UpdateEvent = async (idEvent, eventRequest) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Event/${idEvent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "*/*",
          },
          body: JSON.stringify(eventRequest),
        }
      );
      if (response.status === 204) {
        // No Content: Devolvemos true porque se actualizo correctamente.
        return true;
      }

      // Si no es 204, intentamos convertir la respuesta a JSON.
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      return null;
    }
  };

  const DeleteEvent = async (idEvent) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Event/${idEvent}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
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
            Authorization: `Bearer ${getToken()}`,
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
            Authorization: `Bearer ${getToken()}`,
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
            Authorization: `Bearer ${getToken()}`,
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
  const UpdateParticipant = async (
    idParticipant,
    idEvent,
    participantRequest
  ) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/events/Participant/${idParticipant}?idEvent=${idEvent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "application/json",
          },
          body: JSON.stringify(participantRequest),
        }
      );
      if (response.status === 204) {
        // No Content: Devolvemos true porque se actualizo correctamente.
        return true;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al actualizar el participante ", error);
      return null;
    }
  };
  const DeleteParticipant = async (idParticipant, idEvent) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/events/Participant/${idParticipant}?idEvent=${idEvent}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "*/*",
          },
        }
      );
      if (response.status === 204) {
        return true;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al eliminar el participante ", error);
      return null;
    }
  };
  const UpdateTask = async (taskId, eventId, taskRequest) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Task/${taskId}?eventId=${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "*/*",
          },
          body: JSON.stringify(taskRequest),
        }
      );
      if (response.status === 204) {
        return true;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar la tarea ", error);
      return null;
    }
  };
  const DeleteTask = async (taskId, eventId) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Task/${taskId}?eventId=${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "*/*",
          },
        }
      );
      if (response.status === 204) {
        return true;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar la tarea ", error);
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
    UpdateParticipant,
    DeleteParticipant,
    UpdateTask,
    DeleteTask,
  };
  return <EventContext.Provider value={data}>{children}</EventContext.Provider>;
};

export default EventProvider;
