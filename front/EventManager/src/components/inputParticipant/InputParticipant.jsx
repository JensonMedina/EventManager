import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const InputParticipant = ({
  removeParticipant,
  setParticipants,
  setError,
  participant,
}) => {
  const handleParticipantChange = (e) => {
    setError({});
    const { name, value } = e.target;

    setParticipants((prev) => {
      const newParticipants = [...prev];
      const index = newParticipants.findIndex((p) => p.id === participant.id);

      if (index !== -1) {
        newParticipants[index][name] = value || "";
      }

      
      return newParticipants;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Nombre"
        className="flex-1"
        name="name"
        value={participant.name}
        onChange={handleParticipantChange}
      />
      <Input
        placeholder="Email"
        name="email"
        className="flex-1"
        value={participant.email}
        onChange={handleParticipantChange}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => removeParticipant(participant.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InputParticipant;
