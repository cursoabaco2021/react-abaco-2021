const API_URL = "http://localhost:8012/ProyectoAbaco/src/Controladores/ControladorCurso";

export const listarCursos = async () => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "listarCursos"
        })
    });
};

export const buscarCursos = async (nombreBuscar) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "buscarCursos",
            curso: {
                nombre: nombreBuscar
            }
        })
    });
};

export const leerCurso = async (codigo) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "leerCurso",
            curso: {
                codigo: codigo
            }
        })
    });
};

export const registrarCurso = async (curso) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "registrarCurso",
            curso: curso
        })
    });
};

export const actualizarCurso = async (curso) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "actualizarCurso",
            curso: curso
        })
    });
};

export const eliminarCurso = async (codigo) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "eliminarCurso",
            curso: {
                codigo: codigo
            }
        })
    });
};
