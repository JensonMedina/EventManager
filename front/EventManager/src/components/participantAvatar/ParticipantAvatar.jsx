import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const ParticipantAvatar = ({ participantName, participantEmail }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4 items-center">
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
      <div className="col-start-3 justify-self-end">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantAvatar;
