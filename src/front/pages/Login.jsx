import { useState } from "react";

export const Login = () => {
    //capturar form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando info:", { email, password });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear cuenta</h2>

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>

                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input type="email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button className="btn btn-primary w-100">Registrarme</button>
            </form>
        </div>
    );
};
