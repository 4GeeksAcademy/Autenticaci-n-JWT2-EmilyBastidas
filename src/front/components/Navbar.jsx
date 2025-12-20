import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";
import { TfiWrite } from "react-icons/tfi";
import { RxExit } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";


export const Navbar = () => {
  //estados
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
  
    setToken(sessionStorage.getItem("token"));
  }, [location]);
//elimina token y actualiza estado
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null); 
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{display: "flex", justifyContent: "space-between",padding: "1rem", backgroundColor:"rgb(254, 231, 222)"}}>
      <div>
        <Link to="/"><HiHomeModern  style={{ fontSize:"20px", color:"#010101ff" }} /></Link>
      </div>

      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}> <CiUser style={{ fontSize:"20px", color:"#010101ff" }}/>
            </Link>
            <Link to="/signup"><TfiWrite /></Link>
          </>
        ) : (
          <>
            <Link to="/private" style={{ marginRight: "1rem" }}>
              <FaUserCircle style={{ fontSize:"20px", color:"#010101ff" }} />
            </Link>
            <button onClick={logout} style={{ fontSize:"20px", background:"rgb(254, 231, 222)", border:"none" }} >
              <RxExit style={{ fontSize:"20px", color:"#010101ff" }}/>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
