import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
const RowTask = ({ taskName, assignedParticipant, taskStatus }) => {
  return (
    <TableRow>
      <TableCell>{taskName}</TableCell>
      <TableCell>{assignedParticipant.name}</TableCell>
      <TableCell>
        {taskStatus ? (
          <Badge variant="success">
            <CheckCircle className="mr-1 h-3 w-3" /> Completada
          </Badge>
        ) : (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> Pendiente
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowTask;
