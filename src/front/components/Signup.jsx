import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistro = async(e) => {
        e.preventDefault();

        // Validamos campos vacíos
        if (!name || !lastName || !email || !password || !confirmPassword) {
            alert("Por favor complete todos los campos");
            return;
        }
        // Validar la coincidencia de contraseña
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // localStorage.setItem("Name", Name);
        // navigate("/login");

        try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          last_name: lastName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        alert("Error al registrarse");
        return;
      }

      alert("Usuario creado exitosamente");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };
  
    return (
        <div className="container">

            <div className="card mt-5 bg-black bg-gradient w-75 mx-auto">
                <h1 className="mt-5 mb-5 text-light text-center">Registrarse</h1>

                <form className="row gy-3 mx-auto text-center">
                    <div className="col-4">
                        <input type="text" className="form-control" id="autoSizingInputName" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" id="autoSizingInputLastname" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
                    </div>
                    <div className="col-4">
                        <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input type="text" className="form-control" id="autoSizingInputGroupEmail" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                    </div>

                    <div className="col-6">
                        <input type="password" className="form-control" id="autoSizingInputPassword" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <div className="col-6">
                        <input type="password" className="form-control" id="autoSizingInputConfirmPassword" placeholder="Confirme contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    </div>

                  
                    <div className=" text-center">
                        <button className="btn btn-lg btn-info" onClick={handleRegistro}>Registrarme</button>
                    </div>
                    <p className="mt-3 text-light">
                        ¿Ya tienes cuenta? <Link to="/login" className="link-info">Inicia sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}