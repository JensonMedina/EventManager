import React from "react";
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
const EventDetails = ({
  eventName,
  eventStatus,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
  participantsLength,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{eventName}</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
          <CardDescription>
            <Badge variant={eventStatus === "active" ? "default" : "secondary"}>
              {eventStatus === "active" ? "Activo" : "Finalizado"}
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
    </div>
  );
};

export default EventDetails;
