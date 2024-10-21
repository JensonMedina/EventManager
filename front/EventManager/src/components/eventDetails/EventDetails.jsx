import React, { useState, useContext } from "react";
import { Calendar, MapPin, Users, Clock, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { replace, useNavigate, Link } from "react-router-dom";
import { EventContext } from "@/services/eventContext/EventContext";
import AlertDialogDelete from "../alertDialogDelete/AlertDialogDelete";
const EventDetails = ({
  eventId,
  eventName,
  eventStatus,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
  participantsLength,
}) => {
  const navigate = useNavigate();
  const { DeleteEvent } = useContext(EventContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDelete = async () => {
    //eliminar evento y despues redirigir al dashboard.
    //preguntar si esta seguro y solo si acepta se elimina el evento.
    const isSucces = await DeleteEvent(eventId);
    if (!isSucces) {
      console.log("Error al eliminar el evento.");
      return;
    }
    navigate("/", replace);
  };
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{eventName}</h1>
        <div className="space-x-2 flex">
          <Link to={`/edit-event/${eventId}`}>
            <Button variant="outline">
              <Edit className="h-4 w-4" />
              {/* Texto visible solo en pantallas medianas o más grandes */}
              <span className="hidden md:inline ml-2">Editar</span>
            </Button>
          </Link>

          {/* Botón de eliminar */}
          <Button variant="destructive" onClick={openDialog}>
            <Trash2 className="h-4 w-4" />
            {/* Texto visible solo en pantallas medianas o más grandes */}
            <span className="hidden md:inline ml-2">Eliminar</span>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
          <CardDescription>
            <Badge variant={eventStatus ? "default" : "destructive"}>
              {eventStatus ? "Activo" : "Finalizado"}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{eventTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{eventLocation}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{participantsLength} participantes</span>
            </div>
          </div>
          <p className="mt-4">{eventDescription}</p>
        </CardContent>
      </Card>
      <AlertDialogDelete
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={() => {
          handleDelete();
          closeDialog();
        }}
      />
    </div>
  );
};

export default EventDetails;
