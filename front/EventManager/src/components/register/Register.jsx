import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateTimePicker from "@/components/dateTimePicker/DateTimePicker";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Register = () => {
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState({});
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError({});
    switch (name) {
      case "name":
        setNameInput(value);
        break;
      case "lastName":
        setLastNameInput(value);
        break;
      case "email":
        setEmailInput(value);
        break;
      case "password":
        setPasswordInput(value);
        break;
      case "confirm-password":
        setConfirmPasswordInput(value);
        break;
      default:
        break;
    }
  };

  const handleDateChange = (date) => {
    setBirthDateInput(date);
    setError({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nameInput.trim() === "" ||
      lastNameInput.trim() === "" ||
      !birthDateInput ||
      emailInput.trim() === "" ||
      passwordInput.trim() === "" ||
      confirmPasswordInput.trim() === ""
    ) {
      setError({ message: "Todos los campos son requeridos" });
      return;
    }
    if (passwordInput !== confirmPasswordInput) {
      setError({ message: "Las contraseñas no coinciden" });
      return;
    }
    const isRegisterSuccess = await register();
    if (!isRegisterSuccess) {
      showToast("Error al crear la cuenta");
      return;
    }
    showToast("Su cuenta ha sido creada con exito.");
    cleanForm();
  };

  const register = async () => {
    try {
      const response = await fetch("https://localhost:7299/api/User/AddUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          lastName: lastNameInput,
          birthDate: birthDateInput ? birthDateInput : null,
          email: emailInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return true;
      } else {
        showToast(data.message || "Error al crear la cuenta");
        return false;
      }
    } catch (error) {
      showToast("Error de conexión");
      return false;
    }
  };

  const cleanForm = () => {
    setNameInput("");
    setLastNameInput("");
    setBirthDateInput("");
    setEmailInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
  };
  const showToast = (msg) => {
    toast({
      description: msg,
    });
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <Toaster />
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={nameInput}
          placeholder="Tu nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Apellido</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={lastNameInput}
          placeholder="Ingrese su apellido"
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDate">Fecha de nacimiento</Label>
        <div className="w-full">
          <DateTimePicker
            name="birthDate"
            date={birthDateInput}
            setDate={handleDateChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={emailInput}
          placeholder="tu@ejemplo.com"
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={passwordInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
        <Input
          id="confirm-password"
          type="password"
          name="confirm-password"
          value={confirmPasswordInput}
          onChange={handleInputChange}
        />
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};

export default Register;
