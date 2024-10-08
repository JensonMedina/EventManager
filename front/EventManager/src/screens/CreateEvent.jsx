import React, { useContext, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventContext } from "@/services/context/EventContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [error, setError] = useState({});
  const { AddEvent } = useContext(EventContext);
  const { toast } = useToast();

  const [participants, setParticipants] = useState([{ name: "", email: "" }]);
  const [tasks, setTasks] = useState([{ name: "", assignee: "" }]);

  const addParticipant = () => {
    setParticipants([...participants, { name: "", email: "" }]);
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const addTask = () => {
    setTasks([...tasks, { name: "", assignee: "", dueDate: "" }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
      setError({ msg: "Debes completar todos los campos." });
      return;
    }
    const dateTimeString = `${eventDate}T${eventTime}:00`;
    const newEvent = {
      eventName: eventName,
      eventDate: dateTimeString,
      eventLocation: eventLocation,
      eventDescription: eventDescription,
    };
    console.log(newEvent);

    const isCreatedSucces = await AddEvent(newEvent);
    if (!isCreatedSucces) {
      showToast("Error al crear el evento.");
      return;
    }
    showToast("Se creó el evento con exito.");
    cleanForm();
  };
  const cleanForm = () => {
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventDescription("");
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
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input placeholder="Nombre" className="flex-1" />
                <Input placeholder="Email" className="flex-1" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeParticipant(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addParticipant} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Agregar Participante
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tareas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input placeholder="Nombre de la tarea" className="flex-1" />
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Asignar a" />
                  </SelectTrigger>
                  <SelectContent>
                    {participants.map((participant, i) => (
                      <SelectItem key={i} value={`participant-${i}`}>
                        {participant.name || `Participante ${i + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeTask(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addTask} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Agregar Tarea
            </Button>
          </CardContent>
        </Card>
        {error.msg && <p className="text-red-500">{error.msg}</p>}
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Crear Evento</Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateEvent;