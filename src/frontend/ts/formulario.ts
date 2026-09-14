import { AlgoritmoConfig, printLog } from "./event.js";
import { renderizarTablero, renderizarGrafica } from "./tablero.js";

export async function manejarEnvioFormulario(event: Event): Promise<void> {
  event.preventDefault();

  const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement).value;

  const payload: AlgoritmoConfig = {
    tamanoTablero: parseInt(getVal('tamanoTablero'), 10),
    poblacionInicial: parseInt(getVal('poblacionInicial'), 10),
    generacionesRatio: parseInt(getVal('generacionesRatio'), 10),
    mutacionesRatio: parseFloat(getVal('mutacionesRatio'))
  };

  printLog(`Enviando configuración (${payload.tamanoTablero}x${payload.tamanoTablero})...`, 'info');

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    
    const resultados = data.Resultados ?? data.resultados ?? {};
    const matriz = resultados.tablero_matriz ?? resultados.MatrizTablero;
    const historico = resultados.historico ?? resultados.Historico ?? [];

    if (data.Solucion && matriz) {
      printLog(`[Console Mensaje]: Vector Solucion en -> ${resultados.generaciones ?? 0} generaciones!`, 'success');
      renderizarTablero(matriz);
      renderizarGrafica(historico);
    } else {
      printLog(data.Log || '[Console Mensaje]: No se encontro vector solucion', 'error');
      if (historico.length > 0) renderizarGrafica(historico);
    }

  } catch (error) {
    printLog(`Error: ${(error as Error).message}`, 'error');
  }
}