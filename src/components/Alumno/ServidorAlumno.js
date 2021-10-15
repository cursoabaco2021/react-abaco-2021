const API_URL = "http://localhost:8012/ProyectoAbaco/src/Controladores/ControladorAlumno";

export const listarAlumnos = async () => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: "listarAlumnos"
        })
    });
};
