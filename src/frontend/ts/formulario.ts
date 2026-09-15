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
    const vectorSolucion: number[] = resultados.vector_solucion ?? [];
    const historico = resultados.historico ?? resultados.Historico ?? [];

    if (vectorSolucion.length > 0) {
      const N = vectorSolucion.length;
      
      const matrizCorrecta: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
      
      vectorSolucion.forEach((filaReina: number, columna: number) => {
        if (filaReina >= 0 && filaReina < N) {
          matrizCorrecta[filaReina][columna] = 1;
        }
      });

      printLog(`[Console Mensaje]: Solución generada en -> ${resultados.generaciones ?? 0} generaciones!`, 'success');
      
      renderizarTablero(matrizCorrecta, vectorSolucion);
      if (historico.length > 0) renderizarGrafica(historico);
    } else {
      printLog(data.Log || '[Console Mensaje]: No se encontró un vector de solución', 'error');
      if (historico.length > 0) renderizarGrafica(historico);
    }

  } catch (error) {
    printLog(`Error: ${(error as Error).message}`, 'error');
  }
}