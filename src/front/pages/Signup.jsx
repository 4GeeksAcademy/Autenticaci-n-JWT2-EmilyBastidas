import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

//valores de los campos del formulario

    const name = e.target.name.value;
    const last_name = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

 //petición POST al backend con los datos del usuario

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, last_name, email, password })
        }
      );
      
//respuesta del backend

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        alert(data.error || "Error en el registro");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>

      <div className="col-md-6">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="name" required />
      </div>

      <div className="col-md-6">
        <label htmlFor="lastName" className="form-label">Apellido</label>
        <input type="text" className="form-control" id="lastName" required />
      </div>

      <div className="col-12">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input type="email" className="form-control" id="email" required />
      </div>

      <div className="col-12">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password"required minLength="6"
          pattern="(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{6,}"/>
      </div>

      <div className="col-12">
        <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
        <input type="password" className="form-control" id="confirmPassword" required />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </div>
    </form>
  );
}
