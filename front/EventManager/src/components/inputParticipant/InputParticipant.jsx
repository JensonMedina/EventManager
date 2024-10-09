import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const InputParticipant = ({ index, removeParticipant }) => {
  return (
    <div className="flex items-center space-x-2">
      <Input placeholder="Nombre" className="flex-1" />
      <Input placeholder="Email" className="flex-1" />
      <Button
        variant="outline"
        size="icon"
        onClick={() => removeParticipant(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InputParticipant;
