import { Link } from "react-router-dom";

// CSS Personalizado:
import "./css/Navbar.css";

const Navbar = () => {
    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Abaco - React App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/gestionCursos">Gesti&oacute;n de Cursos</Link>
                        <Link className="nav-link" to="/gestionAlumnos">Gesti&oacute;n de Alumnos</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;