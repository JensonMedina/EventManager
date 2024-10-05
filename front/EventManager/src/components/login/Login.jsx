import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/services/authentication/AuthenticationContext";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInputs, setErrorInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorInputs({});
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setErrorInputs({ msg: "Todos los campos son requeridos" });
      return;
    }
    const isLoggedIn = await login(email, password);

    if (!isLoggedIn) {
      setErrorInputs({ msg: "usuario o contraseña incorrectos" });
      return;
    }
    navigate("/", replace);
  };
  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@ejemplo.com"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
          onChange={handleChange}
        />
      </div>
      {errorInputs.msg && <p className="text-red-500">{errorInputs.msg}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default Login;
