import React, { useContext, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { EventContext } from "@/services/eventContext/EventContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const RowTask = ({ task, idEvent, participants, load, setLoad }) => {
  const { UpdateTask, DeleteTask } = useContext(EventContext);
  const [edit, setEdit] = useState(false);
  const [nameTask, setNameTask] = useState(task.nameTask);
  const [assignedParticipantId, setAssignedParticipantId] = useState(
    task.assignedParticipant.id
  );
  const [taskState, setTaskState] = useState(task.state);
  const handleUpdateTask = async () => {
    if (nameTask.trim() === "") {
      return;
    }
    const taskRequest = {
      nameTask: nameTask,
      state: taskState === "true" ? true : false,
      assignedParticipantId: assignedParticipantId,
    };
    const isSuccess = await UpdateTask(task.id, idEvent, taskRequest);
    if (!isSuccess) {
      console.log("Error al actualizar la tarea");
      return;
    }
    setEdit(false);
    setLoad(!load);
  };
  const handleDeleteTask = async () => {
    const isSuccess = await DeleteTask(task.id, idEvent);
    if (!isSuccess) {
      console.log("Error al eliminar la tarea");
      return;
    }
    setLoad(!load);
  };
  if (edit) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={nameTask}
            onChange={(e) => setNameTask(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <select
            name="assignedParticipantId"
            className="flex-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={assignedParticipantId}
            onChange={(e) => setAssignedParticipantId(e.target.value)}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell>
          <select
            name="assignedParticipantId"
            className="flex-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={taskState.toString()}
            onChange={(e) => setTaskState(e.target.value)}
          >
            <option value="true">Completada</option>
            <option value="false">Pendiente</option>
          </select>
        </TableCell>
        <TableCell>
          <div className="flex gap-4">
            <Button onClick={handleUpdateTask}>Guardar</Button>
            <Button variant="outline" onClick={() => setEdit(false)}>
              Cancelar
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableRow>
      <TableCell>{task.nameTask}</TableCell>
      <TableCell>{task.assignedParticipant.name}</TableCell>
      <TableCell>
        {task.state ? (
          <Badge variant="success" className="cursor-pointer">
            <CheckCircle className="mr-1 h-3 w-3" /> Completada
          </Badge>
        ) : (
          <Badge variant="destructive" className="cursor-pointer">
            <XCircle className="mr-1 h-3 w-3" /> Pendiente
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" onClick={() => setEdit(true)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDeleteTask}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowTask;
