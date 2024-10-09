import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EventDetails from "@/components/eventDetails/EventDetails";
import TabParticipants from "@/components/tabParticipants/TabParticipants";
import TabTasks from "@/components/tabTasks/TabTasks";

const EventDetail = () => {
  const event = {
    id: "1",
    name: "Conferencia de Tecnología 2023",
    date: "2023-08-15",
    time: "09:00 AM",
    location: "Centro de Convenciones",
    description:
      "Una conferencia sobre las últimas tendencias en tecnología y desarrollo de software.",
    status: "active",
    participants: [
      {
        id: "1",
        name: "Ana García",
        email: "ana@example.com",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Carlos López",
        email: "carlos@example.com",
        avatar: "/placeholder.svg",
      },
      {
        id: "3",
        name: "Elena Martínez",
        email: "elena@example.com",
        avatar: "/placeholder.svg",
      },
      {
        id: "4",
        name: "Jenson Medina",
        avatar: "/placeholder.svg",
      },
    ],
    tasks: [
      {
        id: "1",
        name: "Reservar sala de conferencias",
        assignee: "Ana García",
        dueDate: "2023-07-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Enviar invitaciones",
        assignee: "Carlos López",
        dueDate: "2023-07-20",
        status: "completed",
      },
      {
        id: "3",
        name: "Preparar presentaciones",
        assignee: "Elena Martínez",
        dueDate: "2023-08-01",
        status: "in-progress",
      },
      {
        id: "4",
        name: "Coordinar catering",
        assignee: "Ana García",
        dueDate: "2023-08-10",
        status: "pending",
      },
    ],
  };

  const completedTasks = event.tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = event.tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="container mx-auto p-6">
      <EventDetails
        eventName={event.name}
        eventStatus={event.status}
        eventDate={event.date}
        eventTime={event.time}
        eventLocation={event.location}
        eventDescription={event.description}
        participantsLength={event.participants.length}
      />
      <Tabs defaultValue="participants" className="mb-6">
        <TabsList>
          <TabsTrigger value="participants">Participantes</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <TabParticipants participants={event.participants} />
        </TabsContent>
        <TabsContent value="tasks">
          <TabTasks
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            progress={progress}
            tasks={event.tasks}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDetail;
