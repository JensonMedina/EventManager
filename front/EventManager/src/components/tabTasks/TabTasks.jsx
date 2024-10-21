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
import { v4 as uuidv4 } from "uuid";

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
    { id: uuidv4(), nameTask: "", assignedParticipantId: "" },
  ]);
  const { AddTask } = useContext(EventContext);
  const [error, setError] = useState({});
  const addTask = () => {
    setTasksInput([
      ...tasksInput,
      { id: uuidv4(), nameTask: "", assignedParticipantId: "" },
    ]);
  };

  const removeTask = (id) => {
    setError({});
    setTasksInput(tasksInput.filter((t) => t.id !== id));
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

    if (
      tasksInput.some(
        (t) => t.nameTask.trim() === "" || t.assignedParticipantId.trim() === ""
      )
    ) {
      setError({
        msg: "Debes completar los campos de información de todas las tareas.",
      });
      return;
    }
    const isSuccess = await AddTask(idEvent, tasksInput);
    if (!isSuccess) {
      console.log("Error al crear las tareas.");
      return;
    }
    setError({});
    setLoad(!load);
    setTasksInput([{ id: uuidv4(), nameTask: "", assignedParticipantId: "" }]);
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
          <div className="overflow-x-auto">
            <Table className="min-w-full border border-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <RowTask
                    key={task.id}
                    task={task}
                    idEvent={idEvent}
                    participants={participants}
                    load={load}
                    setLoad={setLoad}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <form onSubmit={handleFormAddTask}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agregar tareas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasksInput.map((task) => (
              <InputTask
                key={task.id}
                task={task}
                participants={participants}
                removeTask={removeTask}
                setTasksInput={setTasksInput}
                setError={setError}
              />
            ))}
            {error.msg && <p className="text-red-500">{error.msg}</p>}
            <div className="flex flex-col gap-2 md:flex-row">
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
