import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { EventContext } from "@/services/eventContext/EventContext";
import { Input } from "../ui/input";
import AlertDialogDelete from "../alertDialogDelete/AlertDialogDelete";

const ParticipantAvatar = ({ participant, idEvent, load, setLoad }) => {
  const { UpdateParticipant, DeleteParticipant } = useContext(EventContext);
  const [isEdit, setIsEdit] = useState(false);
  const [participantName, setParticipantName] = useState(participant.name);
  const [participantEmail, setParticipantEmail] = useState(participant.email);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const handleUpdateParticipant = async () => {
    if (participantName.trim() === "") return;

    const participantRequest = {
      name: participantName,
      email: participantEmail,
    };

    const isSucces = await UpdateParticipant(
      participant.id,
      idEvent,
      participantRequest
    );
    if (!isSucces) {
      console.log("Error al actualizar el participante.");
      return;
    }
    setIsEdit(false);
    setLoad(!load);
  };
  const handleDelete = async () => {
    const isSucces = await DeleteParticipant(participant.id, idEvent);
    if (!isSucces) {
      console.log("Error al eliminar el evento.");
      return;
    }
    setLoad(!load);
  };
  if (isEdit) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <Input
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Nombre del participante"
          className="w-full "
          value={participantName}
        />
        <Input
          onChange={(e) => setParticipantEmail(e.target.value)}
          placeholder="Correo del participante"
          className="w-full"
          value={participantEmail}
        />
        <Button
          onClick={() => handleUpdateParticipant()}
          className="w-full md:w-auto"
        >
          Guardar
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsEdit(false)}
          className="w-full md:w-auto"
        >
          Cancelar
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 items-center sm:grid-cols-3">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt={participant.name} />
          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{participant.name}</p>
          <p className="text-sm text-muted-foreground">{participant.email}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4 sm:col-start-3 sm:justify-self-end">
        <Button variant="outline" size="icon" onClick={() => setIsEdit(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={openDialog}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <AlertDialogDelete
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={() => {
          handleDelete();
          closeDialog();
        }}
      />
    </div>
  );
};

export default ParticipantAvatar;
