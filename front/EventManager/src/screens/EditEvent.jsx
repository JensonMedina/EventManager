import React, { useContext, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { EventContext } from "@/services/eventContext/EventContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import InputParticipant from "@/components/inputParticipant/InputParticipant";
import InputTask from "@/components/inputTask/InputTask";
import { useParams } from "react-router-dom";

const EditEvent = () => {
  const { idEvent } = useParams();
  const { GetEventById, UpdateEvent } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [error, setError] = useState({});
  const [participants, setParticipants] = useState([
    { id: "", name: "", email: "" },
  ]);
  const [tasks, setTasks] = useState([
    {
      id: "",
      nameTask: "",
      assignedParticipant: { id: "", name: "", email: "" },
    },
  ]);

  const { toast } = useToast();
  useEffect(() => {
    const getEvent = async () => {
      const eventFromApi = await GetEventById(idEvent);
      if (eventFromApi) {
        setEvent(eventFromApi.data);
      }
    };
    getEvent();
  }, [idEvent, GetEventById]);

  useEffect(() => {
    if (!event) return;

    const eventDate = new Date(event.eventDate);
    const isoDate = eventDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    setEventDate(isoDate);

    setEventTime(
      eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setEventName(event.eventName);
    setEventLocation(event.eventLocation);
    setEventDescription(event.eventDescription);
    setParticipants(event.participants);
    setTasks(event.tasks);
  }, [event]);

  const handleChange = (e) => {
    setError({});
    switch (e.target.name) {
      case "eventName":
        setEventName(e.target.value);
        break;
      case "eventDate":
        setEventDate(e.target.value);
        break;
      case "eventTime":
        setEventTime(e.target.value);
        break;
      case "eventLocation":
        setEventLocation(e.target.value);
        break;
      case "eventDescription":
        setEventDescription(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      eventName.trim() === "" ||
      eventDate.trim() === "" ||
      eventLocation.trim() === "" ||
      eventDescription.trim() === ""
    ) {
      setError({
        msg: "Debes completar los campos de información del evento.",
      });
      return;
    }
    if (participants.some((p) => p.name.trim() === "")) {
      setError({ msg: "Todos los participantes deben tener un nombre." });
      return;
    }
    const dateTimeString = `${eventDate}T${eventTime}:00`;
    const eventUpdated = {
      eventName: eventName,
      eventDate: dateTimeString,
      eventLocation: eventLocation,
      eventDescription: eventDescription,
    };
    const isSuccess = await UpdateEvent(idEvent, eventUpdated);
    if (isSuccess) {
      showToast("Evento actualizado correctamente");
    } else {
      showToast("Error al actualizar evento");
    }
  };

  const showToast = (msg) => {
    toast({
      description: msg,
    });
  };
  if (!event) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Editar evento</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información del Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Nombre del Evento</Label>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Ingrese el nombre del evento"
                onChange={handleChange}
                value={eventName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Fecha del Evento</Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                onChange={handleChange}
                value={eventDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Hora de inicio</Label>
              <Input
                id="eventTime"
                name="eventTime"
                type="time"
                onChange={handleChange}
                value={eventTime}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Ubicación</Label>
              <Input
                id="eventLocation"
                name="eventLocation"
                placeholder="Ingrese la ubicación del evento"
                onChange={handleChange}
                value={eventLocation}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">Descripción</Label>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="Describa el evento"
                className="resize-none"
                onChange={handleChange}
                value={eventDescription}
              />
            </div>
          </CardContent>
        </Card>

        {error.msg && <p className="text-red-500">{error.msg}</p>}
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">
            <Link to={"/"}>Cancelar</Link>
          </Button>
          <Button type="submit">Guardar cambios</Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default EditEvent;
