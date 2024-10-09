import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
const RowTask = ({ taskName, taskAssignee, taskStatus }) => {
  return (
    <TableRow>
      <TableCell>{taskName}</TableCell>
      <TableCell>{taskAssignee}</TableCell>
      <TableCell>
        {taskStatus === "completed" ? (
          <Badge variant="success">
            <CheckCircle className="mr-1 h-3 w-3" /> Completada
          </Badge>
        ) : taskStatus === "in-progress" ? (
          <Badge variant="warning">En progreso</Badge>
        ) : (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" /> Pendiente
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowTask;
