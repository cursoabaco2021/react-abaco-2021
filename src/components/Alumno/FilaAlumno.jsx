import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faMale, faFemale } from "@fortawesome/free-solid-svg-icons";

import * as Utilitarios from "./../../utils/utilitarios";

const FilaAlumno = ({ index, alumno }) => {
    return (
        <tr>
            <td className="centrado">{index + 1}</td>
            <td className="centrado">{alumno.codigo}</td>
            <td className="centrado">{alumno.nombreCompleto}</td>
            <td className="centrado">
                {
                    (alumno.sexo === "F")
                        ? <FontAwesomeIcon icon={faFemale} size="2x" style={{ color: '#E6007E' }} />
                        : <FontAwesomeIcon icon={faMale} size="2x" style={{ color: 'blue' }} />
                }
            </td>
            <td className="centrado">{Utilitarios.obtenerEdad(alumno.fechaNacimiento)}</td>
            <td className="centrado">{alumno.especialidad.nombre}</td>
            <td className="centrado">
                <button className='btn btn-sm btn-primary me-1'>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button className='btn btn-sm btn-danger'>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
};

export default FilaAlumno;