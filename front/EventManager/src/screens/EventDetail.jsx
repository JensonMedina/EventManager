import React, { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventDetails from "@/components/eventDetails/EventDetails";
import TabParticipants from "@/components/tabParticipants/TabParticipants";
import TabTasks from "@/components/tabTasks/TabTasks";
import { useParams } from "react-router-dom";
import { EventContext } from "@/services/eventContext/EventContext";

const EventDetail = () => {
  const { idEvent } = useParams();
  const { GetEventById } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [eventStatus, setEventStatus] = useState(true); //true = activo, false = finalizado
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      const eventFromApi = await GetEventById(idEvent);
      if (eventFromApi) {
        setEvent(eventFromApi.data);
      }
    };
    getEvent();
  }, [idEvent, GetEventById, load]);

  useEffect(() => {
    if (!event) return;

    const eventDate = new Date(event.eventDate);
    setDate(eventDate.toLocaleDateString());
    setTime(
      eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const isActive = new Date() < eventDate;
    setEventStatus(isActive);
    const totalTasks = event.tasks.length;
    setTotalTasks(totalTasks);

    const completedTasks = event.tasks.filter((task) => task.state).length;
    setCompletedTasks(completedTasks);

    const progress = (completedTasks / totalTasks) * 100;
    setProgress(progress);
  }, [event]);

  if (!event) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <EventDetails
        eventId={idEvent}
        eventName={event.eventName}
        eventStatus={eventStatus}
        eventDate={date}
        eventTime={time}
        eventLocation={event.eventLocation}
        eventDescription={event.eventDescription}
        participantsLength={event.participants.length}
      />
      <Tabs defaultValue="participants" className="mb-6">
        <TabsList>
          <TabsTrigger value="participants">Participantes</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <TabParticipants
            idEvent={idEvent}
            participants={event.participants}
            load={load}
            setLoad={setLoad}
          />
        </TabsContent>
        <TabsContent value="tasks">
          <TabTasks
            idEvent={event.id}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            progress={progress}
            tasks={event.tasks}
            participants={event.participants}
            load={load}
            setLoad={setLoad}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDetail;
