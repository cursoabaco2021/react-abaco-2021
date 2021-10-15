import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import * as ServidorCurso from "./ServidorCurso";

// Toast
import { ToastOptions_Bottom_Left } from "./../../utils/Toast/ToastOptions";

// CSS Personalizado:
import "./css/FormularioCurso.css";

const MySwal = withReactContent(Swal);

const FormularioCurso = () => {
    const history = useHistory();
    const params = useParams();

    const estadoInicial = { codigo: "", nombre: "", creditos: 1 };

    const [curso, setCurso] = useState(estadoInicial);
    const inputCodigo = useRef(null);
    const inputNombre = useRef(null);

    const validarCampos = () => {
        let mensajeAlerta = "";
        if (!isNaN(curso.codigo)) {
            if (String(curso.codigo).trim().length === 6) {
                let nombreCurso = String(curso.nombre).trim();
                if ((nombreCurso.length >= 3) && (nombreCurso.length <= 25)) {
                    if (curso.creditos >= 1 && curso.creditos <= 9) {
                        return true;
                    } else {
                        mensajeAlerta = "El n° de créditos debe estar entre 1 y 9.";
                    }
                } else {
                    mensajeAlerta = "El nombre del curso debe tener entre 3 y 25 caracteres.";
                }
            } else {
                mensajeAlerta = "El código del curso debe tener 6 dígitos.";
            }
        } else {
            mensajeAlerta = "Código debe ser numérico.";
        }
        MySwal.fire(document.title, mensajeAlerta, "warning");
        return false;
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (validarCampos()) {
            (!params.codigo) ? registrarCurso() : actualizarCurso();
            history.push("/gestionCursos");
        }
    };

    const registrarCurso = async () => {
        try {
            const res = await ServidorCurso.registrarCurso(curso);
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                MySwal.fire(document.title, "¡Curso registrado!", "success");
            } else if (data.mensaje === "ERROR") {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            } else if (data.mensaje === "CODIGO_YAEXISTE") {
                toast.info("Código de curso ya existe.", ToastOptions_Bottom_Left);
            } else {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    };

    const actualizarCurso = async () => {
        try {
            const res = await ServidorCurso.actualizarCurso(curso);
            const data = await res.json();
            if (data.mensaje === "EXITO") {
                MySwal.fire(document.title, "¡Curso actualizado!", "success");
            } else if (data.mensaje === "ERROR") {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            } else {
                toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    };

    const manejarInputChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        setCurso({ ...curso, [e.target.name]: e.target.value });
    };

    const leerCurso = async (codigoCurso) => {
        try {
            const res = await ServidorCurso.leerCurso(codigoCurso);
            const data = await res.json();
            const { codigo, nombre, creditos } = data.curso; // Destructuring.
            setCurso({ codigo, nombre, creditos });
            inputCodigo.current.readOnly = true;
            inputNombre.current.focus();
        } catch (error) {
            toast.error("Ocurrió un error inesperado...", ToastOptions_Bottom_Left);
        }
    }

    useEffect(() => {
        if (params.codigo) {
            leerCurso(params.codigo);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="row">
            <div id="formularioCurso" className="col-sm-12 col-md-4 col-lg-4 col-xl-4 mx-auto">
                <h3>Curso</h3>
                <form className="my-3" onSubmit={manejarSubmit}>
                    <div className="mb-3">
                        <label htmlFor="txtCodigo" className="form-label">C&oacute;digo</label>
                        <input type="text" id="txtCodigo" ref={inputCodigo} className="form-control" value={curso.codigo} onChange={manejarInputChange} name="codigo" minLength="6" maxLength="6" placeholder="Código..." aria-describedby="codigoHelp" autoFocus required />
                        <div id="codigoHelp" className="form-text">No registrar un c&oacute;digo ya existente.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtNombre" className="form-label">Nombre</label>
                        <input type="text" id="txtNombre" ref={inputNombre} className="form-control" value={curso.nombre} onChange={manejarInputChange} name="nombre" minLength="3" maxLength="25" placeholder="Nombre..." required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="numCreditos" className="form-label">Cr&eacute;ditos</label>
                        <input type="number" id="numCreditos" className="form-control" value={curso.creditos} onChange={manejarInputChange} name="creditos" min="1" max="9" required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" id="btnGuardar" className="btn btn-success">
                            <FontAwesomeIcon icon={faSave} /> Guardar
                        </button>
                        <button type="reset" className="btn btn-outline-secondary">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default FormularioCurso;