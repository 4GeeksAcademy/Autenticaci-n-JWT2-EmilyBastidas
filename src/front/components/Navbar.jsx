import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { TbDoorExit } from "react-icons/tb";

export const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg nav-gradient shadow">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1"><FaHome className="home-icon" /></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/signup"><TfiWrite /> Registrarse</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/login"><CgProfile />  Ingrese</Link>
            </li>

            <Link to="/home" className="nav-link text-dark"><TbDoorExit /></Link>

          </ul>
        </div>

      </div>
    </nav>
  );
};






