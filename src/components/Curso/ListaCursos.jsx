import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Components:
import FilaCurso from "./FilaCurso";

import * as ServidorCurso from "./ServidorCurso";

// Toast
import { ToastOptions_Bottom_Left } from "./../../utils/Toast/ToastOptions";

// CSS Personalizado:
import "./css/ListaCursos.css";

const ListaCursos = () => {
    const cabecerasTabla = ["#", "Código", "Nombre", "Créditos", "Opciones"];
    const [cursos, setCursos] = useState([]);
    const [nombreBuscar, setNombreBuscar] = useState("");

    const listarCursos = async () => {
        try {
            const res = await ServidorCurso.listarCursos();
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                setCursos(data.cursos);
                toast.success("¡Cursos listados con éxito!", ToastOptions_Bottom_Left);
            } else if (data.mensaje === "NOEXISTEN") {
                toast.info("Cursos no encontrados...", ToastOptions_Bottom_Left);
            } else {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    };

    const buscarCursos = async () => {
        try {
            const res = await ServidorCurso.buscarCursos(nombreBuscar);
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                setCursos(data.cursos);
            } else if (data.mensaje === "NOEXISTEN") {
                setCursos([]);
                toast.info("Cursos no encontrados...", ToastOptions_Bottom_Left);
            } else {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    };

    useEffect(() => {
        document.title = "Gestión de Cursos";
        listarCursos();
    }, []);

    useEffect(() => {
        buscarCursos();
        // eslint-disable-next-line
    }, [nombreBuscar]);

    return (
        <div id="contenedorListaCursos" className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-3">
                <form className="my-3">
                    <div className="mb-3">
                        <input type="text" id="txtNombreBuscar" className="form-control" value={nombreBuscar} onChange={(e) => setNombreBuscar(e.target.value)} name="nombreBuscar" maxLength="25" placeholder="Ingrese un curso para buscar..." />
                    </div>
                </form>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-3">
                <div className="d-grid gap-2">
                    <Link className="btn btn-success" to="/registroCurso">
                        <FontAwesomeIcon icon={faPlusCircle} /> Registrar Curso
                    </Link>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {cabecerasTabla.map((cabecera, index) => (
                                    <th className="centrado" key={index}>{cabecera}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso, index) => (
                                <FilaCurso key={curso.codigo} index={index} curso={curso} listarCursos={listarCursos} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default ListaCursos;