import React from "react";
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

const TabTasks = ({ completedTasks, totalTasks, progress, tasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas</CardTitle>
        <CardDescription>
          Progreso general: {completedTasks} de {totalTasks} tareas completadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
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
                taskName={task.name}
                taskAssignee={task.assignee}
                taskStatus={task.status}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Agregar Tarea
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TabTasks;
