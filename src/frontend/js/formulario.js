var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

import { printLog } from "./event.js";
import { renderizarTablero, renderizarGrafica } from "./tablero.js";

export function manejarEnvioFormulario(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        event.preventDefault();
        const getVal = (id) => document.getElementById(id).value;
        const payload = {
            tamanoTablero: parseInt(getVal('tamanoTablero'), 10),
            poblacionInicial: parseInt(getVal('poblacionInicial'), 10),
            generacionesRatio: parseInt(getVal('generacionesRatio'), 10),
            mutacionesRatio: parseFloat(getVal('mutacionesRatio'))
        };
        printLog(`Enviando configuración (${payload.tamanoTablero}x${payload.tamanoTablero})...`, 'info');
        try {
            const response = yield fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);

            const data = yield response.json();
            const resultados = (_b = (_a = data.Resultados) !== null && _a !== void 0 ? _a : data.resultados) !== null && _b !== void 0 ? _b : {};
            const vectorSolucion = (_c = resultados.vector_solucion) !== null && _c !== void 0 ? _c : [];
            const matriz = (_d = resultados.tablero_matriz) !== null && _d !== void 0 ? _d : resultados.MatrizTablero;
            const historico = (_f = (_e = resultados.historico) !== null && _e !== void 0 ? _e : resultados.Historico) !== null && _f !== void 0 ? _f : [];

            if (data.Solucion && matriz) {
                printLog(`[Console Mensaje]: Vector Solucion en -> ${(_g = resultados.generaciones) !== null && _g !== void 0 ? _g : 0} generaciones!`, 'success');
                printLog(`[Console Informacion]: Tamaño del tabler -> ${(resultados.data)}`, 'sucess')
                renderizarTablero(matriz, vectorSolucion);
                renderizarGrafica(historico);
            }
            else {
                printLog(data.Log || '[Console Mensaje]: No se encontro vector solucion', 'error');

                if (historico.length > 0)
                    renderizarGrafica(historico);
            }
        }
        catch (error) {
            printLog(`Error: ${error.message}`, 'error');
        }
    });
}
