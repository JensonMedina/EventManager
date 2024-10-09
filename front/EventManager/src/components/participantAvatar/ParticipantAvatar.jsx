import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ParticipantAvatar = ({ participantName, participantEmail }) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/placeholder.svg" alt={participantName} />
        <AvatarFallback>{participantName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{participantName}</p>
        <p className="text-sm text-muted-foreground">{participantEmail}</p>
      </div>
    </div>
  );
};

export default ParticipantAvatar;
