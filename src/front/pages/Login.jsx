import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  //fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch(
        "https://fantastic-lamp-9rr6x4559r7hx7wj-3001.app.github.dev/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(data.msg || "Correo o contraseña inválidos"); 
        return;
      }

      //guarda el token
      sessionStorage.setItem ("token", data.token);

     //redirecciona al perfil
      navigate("/private");

    } catch (err) {
      setError ("Error de conexión, intente nuevamente");
      console.error("Error de red:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar sesión</h2>

      {error && (
        <div className= "alert alert-danger text-center " role="alert"> {error} </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control " value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}required/>
        </div>

        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
};
