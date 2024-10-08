import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar, MapPin, Users, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const CardEvent = ({ event }) => {
  const eventDate = new Date(event.eventDate);
  const date = eventDate.toLocaleDateString();
  const time = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isEventActive = new Date() < eventDate;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{event.eventName}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
              <DropdownMenuItem>Editar evento</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Eliminar evento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4" />
          <span>{event.eventLocation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>{event.participants} participantes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant={isEventActive ? "default" : "destructive"}>
          {isEventActive ? "Activo" : "Finalizado"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default CardEvent;
