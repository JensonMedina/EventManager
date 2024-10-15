import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar, MapPin, Users, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AlertDialogDelete from "@/components/alertDialogDelete/AlertDialogDelete";
import { EventContext } from "@/services/eventContext/EventContext";
const CardEvent = ({ event, load, setLoad }) => {
  const eventDate = new Date(event.eventDate);
  const date = eventDate.toLocaleDateString();
  const time = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isEventActive = new Date() < eventDate;
  const { DeleteEvent } = useContext(EventContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const handleDelete = async () => {
    //eliminar evento y despues redirigir al dashboard.
    //preguntar si esta seguro y solo si acepta se elimina el evento.
    const isSucces = await DeleteEvent(event.id);
    if (!isSucces) {
      console.log("Error al eliminar el evento.");
      return;
    }
    setLoad(!load);
  };

  return (
    <div>
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
                <DropdownMenuItem>
                  <Link to={`/event-detail/${event.id}`}>Ver detalles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Editar evento</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={openDialog}>
                  Eliminar evento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>{event.eventDescription}</CardDescription>
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
            <span>{event.participants.length} participantes</span>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant={isEventActive ? "default" : "destructive"}>
            {isEventActive ? "Activo" : "Finalizado"}
          </Badge>
        </CardFooter>
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

export default CardEvent;
