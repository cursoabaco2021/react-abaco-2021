import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components:
import FilaAlumno from "./FilaAlumno";

import * as ServidorAlumno from "./ServidorAlumno";

// Toast
import { ToastOptions_Bottom_Left } from "./../../utils/Toast/ToastOptions";

// CSS Personalizado:
import "./css/ListaAlumnos.css";

const ListaAlumnos = () => {
    const cabecerasTabla = ["#", "Código", "Alumno", "Sexo", "Edad", "Especialidad", "Opciones"];
    const [alumnos, setAlumnos] = useState([]);

    const listarAlumnos = async () => {
        try {
            const res = await ServidorAlumno.listarAlumnos();
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                setAlumnos(data.alumnos);
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

    useEffect(() => {
        document.title = "Gestión de Alumnos";
        listarAlumnos();
    }, []);

    return (
        <div id="contenedorListaAlumnos" className="row">
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
                            {alumnos.map((alumno, index) => (
                                <FilaAlumno key={alumno.codigo} index={index} alumno={alumno} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default ListaAlumnos;