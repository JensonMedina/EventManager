import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const InputTask = ({
  participants,
  task,
  removeTask,
  setTasksInput,
  setError,
}) => {
  const handleTaskChange = (e) => {
    setError({});
    const { name, value } = e.target;

    setTasksInput((prev) => {
      const newTasks = [...prev];
      const index = newTasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        newTasks[index][name] = value || "";
      }

      return newTasks;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        name="nameTask"
        placeholder="Nombre de la tarea"
        className="flex-1"
        onChange={handleTaskChange}
        value={task.nameTask}
      />

      <select
        name="assignedParticipantId"
        className="flex-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        onChange={handleTaskChange}
        value={task.assignedParticipantId}
      >
        <option value="">Elija un participante</option>
        {participants.map((participant) => (
          <option key={participant.id} value={participant.id}>
            {participant.name}
          </option>
        ))}
      </select>

      <Button variant="outline" size="icon" onClick={() => removeTask(task.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InputTask;
