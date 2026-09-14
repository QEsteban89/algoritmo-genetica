import { manejarEnvioFormulario } from "./formulario.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('algo-form');
  if (form) {
    form.addEventListener('submit', manejarEnvioFormulario);
  }
});