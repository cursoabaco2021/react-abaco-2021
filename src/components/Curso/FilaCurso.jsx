import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

import * as ServidorCurso from "./ServidorCurso";

// Toast
import { ToastOptions_Bottom_Left } from "./../../utils/Toast/ToastOptions";

const MySwal = withReactContent(Swal);

const FilaCurso = ({ index, curso, listarCursos }) => {
    const history = useHistory();

    const manejarEliminacion = async (codigo) => {
        MySwal.fire({
            title: `<span style='font-size: 22px;'>¿Confirma la eliminación del curso con código '${codigo}'?</span>`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#d33',
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async () => {
                await eliminarCurso(codigo);
            },
            allowOutsideClick: () => false,
            allowEscapeKey: () => false
        });
    };

    const eliminarCurso = async (codigo) => {
        try {
            const res = await ServidorCurso.eliminarCurso(codigo);
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                MySwal.fire(document.title, "¡Curso eliminado!", "success");
                listarCursos();
            } else if (data.mensaje === "ERROR") {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            } else if (data.mensaje === "CURSO_TIENEMATRICULADOS") {
                toast.info("El curso tiene alumnos matriculados, no se puede eliminar.", ToastOptions_Bottom_Left);
            } else if (data.mensaje === "CURSO_NOEXISTE") {
                toast.info("Curso no encontrado.", ToastOptions_Bottom_Left);
            } else {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    }

    return (
        <tr>
            <td className="centrado">{index + 1}</td>
            <td className="centrado">{curso.codigo}</td>
            <td className="centrado">{curso.nombre}</td>
            <td className="centrado">{curso.creditos}</td>
            <td className="centrado">
                <button onClick={() => history.push(`/actualizacionCurso/${curso.codigo}`)} className='btn btn-sm btn-primary me-1'>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button onClick={() => curso.codigo && manejarEliminacion(curso.codigo)} className='btn btn-sm btn-danger'>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
};

export default FilaCurso;