import React, { useContext, useEffect, useState } from "react";
import RowTask from "../rowTask/RowTask";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputTask from "@/components/inputTask/InputTask";
import { EventContext } from "@/services/eventContext/EventContext";
import { set } from "date-fns";

const TabTasks = ({
  idEvent,
  completedTasks,
  totalTasks,
  progress,
  tasks,
  participants,
  load,
  setLoad,
}) => {
  const [formAddTaskValid, setFormAddTaskValid] = useState(false);
  const [tasksInput, setTasksInput] = useState([
    { nameTask: "", assignedParticipantId: "" },
  ]);
  const { AddTask } = useContext(EventContext);
  const [error, setError] = useState({});
  const addTask = () => {
    setTasksInput([...tasksInput, { nameTask: "", assignedParticipantId: "" }]);
  };

  const removeTask = (index) => {
    setError({});
    setTasksInput(tasksInput.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormAddTaskValid(
        tasksInput.filter((t) => t.nameTask.trim() !== "").length === 0
      );
    }, 500);
    return () => {
      console.log("Cleanup");
      clearTimeout(timer);
    };
  }, [tasksInput]);

  const handleFormAddTask = async (e) => {
    e.preventDefault();
    for (let i = 0; i < tasksInput.length; i++) {
      if (
        tasksInput[i].nameTask.trim() === "" ||
        tasksInput[i].assignedParticipantId.trim() === ""
      ) {
        setError({
          msg: "Debes completar los campos de información de todas las tareas.",
        });
        return;
      }
    }
    const isSuccess = await AddTask(idEvent, tasksInput);
    if (!isSuccess) {
      console.log("Error al crear las tareas.");
      return;
    }
    setError({});
    setLoad(!load);
    setTasksInput([{ nameTask: "", assignedParticipantId: "" }]);
  };
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tareas</CardTitle>
          <CardDescription>
            Progreso general: {completedTasks} de {totalTasks} tareas
            completadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isNaN(progress) && <Progress value={progress} className="mb-4" />}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarea</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <RowTask
                  key={task.id}
                  taskName={task.nameTask}
                  assignedParticipant={task.assignedParticipant}
                  taskStatus={task.state}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <form onSubmit={handleFormAddTask}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agregar tareas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasksInput.map((task, index) => (
              <InputTask
                key={index}
                task={task}
                participants={participants}
                removeTask={removeTask}
                index={index}
                setTasksInput={setTasksInput}
                setError={setError}
              />
            ))}
            {error.msg && <p className="text-red-500">{error.msg}</p>}
            <div className="flex gap-2">
              <Button onClick={addTask} variant="outline" type="button">
                <Plus className="mr-2 h-4 w-4" /> Agregar Tarea
              </Button>
              <Button type="submit" disabled={formAddTaskValid}>
                Guardar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default TabTasks;
