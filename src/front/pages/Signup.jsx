export default function Signup() {

  return (
    <form id="signupForm" className="row g-3 needs-validation" noValidate>

      <div className="col-12">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          required 
        />
        <div className="invalid-feedback">
          Ingrese un correo válido.
        </div>
      </div>

      <div className="col-12">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          required 
          minLength="6"
          pattern="(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{6,}"
        />
        <div className="invalid-feedback">
          La contraseña debe tener mínimo 6 caracteres, incluyendo números, letras y símbolos.
        </div>
      </div>

      <div className="col-12">
        <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          id="confirmPassword" 
          required 
          minLength="6" 
        />
        <div className="invalid-feedback">
          Las contraseñas no coinciden, intente nuevamente.
        </div>
      </div>

      <div className="col-12">
        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </div>

    </form>
  );
}
