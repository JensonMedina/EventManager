import React, { useContext } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { EventContext } from "@/services/eventContext/EventContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const RowTask = ({ task }) => {
  const { UpdateTask } = useContext(EventContext);
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
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowTask;
