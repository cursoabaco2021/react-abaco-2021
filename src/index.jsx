import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import reportWebVitals from "./reportWebVitals";

// Components:
import Navbar from "./components/Navbar/Navbar";
import Principal from "./components/Principal";
import ListaCursos from "./components/Curso/ListaCursos";
import FormularioCurso from "./components/Curso/FormularioCurso";
import ListaAlumnos from "./components/Alumno/ListaAlumnos";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

// Toast
import "react-toastify/dist/ReactToastify.css";

// Custom CSS
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <div className="container my-3">
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route path="/gestionCursos" component={ListaCursos} />
        <Route path="/registroCurso" component={FormularioCurso} />
        <Route path="/actualizacionCurso/:codigo" component={FormularioCurso} />
        <Route path="/gestionAlumnos" component={ListaAlumnos}></Route>
      </Switch>
      <ToastContainer transition={Flip} />
    </div>
  </BrowserRouter>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
