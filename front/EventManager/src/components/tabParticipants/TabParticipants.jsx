import React, { useContext, useEffect, useState } from "react";
import ParticipantAvatar from "../participantAvatar/ParticipantAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EventContext } from "@/services/eventContext/EventContext";
import InputParticipant from "@/components/inputParticipant/InputParticipant";

const TabParticipants = ({ idEvent, participants, load, setLoad }) => {
  const { AddParticipant } = useContext(EventContext);

  // const [participants, setParticipants] = useState([]);
  const [formAddTaskValid, setFormAddTaskValid] = useState(false);

  const [participantsInput, setParticipantsInput] = useState([
    { name: "", email: "" },
  ]);
  const [error, setError] = useState({});

  useEffect(() => {
    setFormAddTaskValid(
      participantsInput.filter((t) => t.name.trim() !== "").length === 0
    );
  }, [participantsInput]);

  const addParticipant = () => {
    setParticipantsInput([...participantsInput, { name: "", email: "" }]);
  };

  const removeParticipant = (index) => {
    setParticipantsInput((prev) => {
      const newParticipants = [...prev];
      newParticipants.splice(index, 1); // Eliminar el participante en la posición indicada
      return newParticipants;
    });
    setError({});
  };

  const handleFormAddParticipants = async (e) => {
    e.preventDefault();
    // const hasEmptyName = participantsInput.some((p) => p.name.trim() === "");
    if (!formAddTaskValid) {
      setError({ msg: "Todos los participantes deben tener un nombre." });
      return;
    }
    const isSuccess = await AddParticipant(idEvent, participantsInput);
    if (!isSuccess) {
      console.log("Error al agregar los participantes.");
      return;
    }

    setLoad(!load);

    // Limpiar los inputs y errores.
    setParticipantsInput([{ name: "", email: "" }]);
    setError({});
  };
  if (!participants) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Participantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {participants.map((participant) => (
              <ParticipantAvatar
                key={participant.id}
                participantName={participant.name}
                participantEmail={participant.email}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <form onSubmit={handleFormAddParticipants}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agregar Participantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {participantsInput.map((participant, index) => (
              <InputParticipant
                key={index}
                index={index}
                participant={participant}
                removeParticipant={removeParticipant}
                setParticipants={setParticipantsInput}
                setError={setError}
              />
            ))}
            {error.msg && <p className="text-red-500">{error.msg}</p>}
            <div className="flex gap-2">
              <Button onClick={addParticipant} variant="outline" type="button">
                <Plus className="mr-2 h-4 w-4" /> Agregar Participante
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

export default TabParticipants;
