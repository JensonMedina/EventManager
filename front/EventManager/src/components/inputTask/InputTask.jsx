import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const InputTask = ({ participants, index, removeTask }) => {
  return (
    <div className="flex items-center space-x-2">
      <Input placeholder="Nombre de la tarea" className="flex-1" />
      <Select>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Asignar a" />
        </SelectTrigger>
        <SelectContent>
          {participants.map((participant, i) => (
            <SelectItem key={i} value={`participant-${i}`}>
              {participant.name || `Participante ${i + 1}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={() => removeTask(index)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InputTask;
