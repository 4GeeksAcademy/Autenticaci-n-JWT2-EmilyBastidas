import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

  //función para redirigir al usuario y verifiación token

  const navigate = useNavigate ();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem ("token");
    if (!token) {
      navigate("/login");
    } else {
      setChecking(false); 
    }
  }, []);

  if (checking) return null; 

//Borra el token del sessionStorage y redirige a login

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      <p>Bienvenido a su perfil</p>

      <button className="btn btn-dark mt-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};
