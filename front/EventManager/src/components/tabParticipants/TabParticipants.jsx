import React from "react";
import ParticipantAvatar from "../participantAvatar/ParticipantAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TabParticipants = ({ participants }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Participantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {participants.map((participant) => (
            <ParticipantAvatar
              key={participant.id}
              participantName={participant.name}
              participantEmail={participant.email}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Agregar Participante
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TabParticipants;
