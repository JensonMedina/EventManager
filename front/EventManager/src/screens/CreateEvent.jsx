import React, { useContext, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [error, setError] = useState({});
  const { AddEvent } = useContext(EventContext);
  const { AddParticipant } = useContext(EventContext);
  const { toast } = useToast();

  const [participants, setParticipants] = useState([
    { id: uuidv4(), name: "", email: "" },
  ]);

  const addParticipant = () => {
    setParticipants([...participants, { id: uuidv4(), name: "", email: "" }]);
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

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
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].name.trim() === "") {
        setError({ msg: "El nombre de los participantes es obligatorio." });
        return;
      }
    }
    const dateTimeString = `${eventDate}T${eventTime}:00`;
    const newEvent = {
      eventName: eventName,
      eventDate: dateTimeString,
      eventLocation: eventLocation,
      eventDescription: eventDescription,
    };

    const isCreatedSucces = await AddEvent(newEvent);
    if (!isCreatedSucces) {
      showToast("Error al crear el evento.");
      return;
    }
    showToast("Se creó el evento con exito.");
    if (participants.length > 0) {
      const idEvent = isCreatedSucces.data.id;
      if (idEvent !== null) {
        await AddParticipant(idEvent, participants);
      }
    }

    cleanForm();
  };
  const cleanForm = () => {
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventDescription("");
    setParticipants([{ name: "", email: "" }]);
    setError({});
  };
  const showToast = (msg) => {
    toast({
      description: msg,
    });
  };
  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Evento</h1>
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {participants.map((participant) => (
              <InputParticipant
                key={participant.id}
                setParticipants={setParticipants}
                setError={setError}
                removeParticipant={removeParticipant}
                participant={participant}
              />
            ))}
            <Button onClick={addParticipant} variant="outline" type="button">
              <Plus className="mr-2 h-4 w-4" /> Agregar Participante
            </Button>
          </CardContent>
        </Card>

        {error.msg && <p className="text-red-500">{error.msg}</p>}
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">
            <Link to={"/"}>Cancelar</Link>
          </Button>
          <Button type="submit">Crear Evento</Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateEvent;
