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
import { v4 as uuidv4 } from "uuid";
const TabParticipants = ({ idEvent, participants, load, setLoad }) => {
  const { AddParticipant } = useContext(EventContext);

  const [formAddTaskValid, setFormAddTaskValid] = useState(false);

  const [participantsInput, setParticipantsInput] = useState([
    { id: uuidv4(), name: "", email: "" },
  ]);
  const [error, setError] = useState({});

  useEffect(() => {
    setFormAddTaskValid(
      participantsInput.filter((t) => t.name.trim() !== "").length === 0
    );
  }, [participantsInput]);

  const addParticipant = () => {
    setParticipantsInput([
      ...participantsInput,
      { id: uuidv4(), name: "", email: "" },
    ]);
  };

  const removeParticipant = (id) => {
    setParticipantsInput(participantsInput.filter((p) => p.id !== id));
    setError({});
  };

  const handleFormAddParticipants = async (e) => {
    e.preventDefault();
    if (participantsInput.some((p) => p.name.trim() === "")) {
      setError({ msg: "Todos los participantes deben tener un nombre." });
      return;
    }
    const participantsToAdd = participantsInput.map((p) => ({
      name: p.name,
      email: p.email,
    }));
    const isSuccess = await AddParticipant(idEvent, participantsToAdd);
    if (!isSuccess) {
      console.log("Error al agregar los participantes.");
      return;
    }

    setLoad(!load);

    // Limpiar los inputs y errores.
    setParticipantsInput([{ id: uuidv4(), name: "", email: "" }]);
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
                participant={participant}
                idEvent={idEvent}
                load={load}
                setLoad={setLoad}
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
            {participantsInput.map((participant) => (
              <InputParticipant
                key={participant.id}
                participant={participant}
                removeParticipant={removeParticipant}
                setParticipants={setParticipantsInput}
                setError={setError}
              />
            ))}
            {error.msg && <p className="text-red-500">{error.msg}</p>}
            <div className="flex flex-col gap-2 md:flex-row">
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
