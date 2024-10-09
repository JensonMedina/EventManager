import React, { useState, useContext, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardEvent from "@/components/cardEvent/CardEvent";
import { EventContext } from "@/services/eventContext/EventContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { GetAllEvents } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const events = await GetAllEvents();
      if (events) {
        setEvents(events);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Eventos</h1>

        <Link to={"/create-event"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Crear nuevo evento
          </Button>
        </Link>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar eventos..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="finished">Finalizados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <CardEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
