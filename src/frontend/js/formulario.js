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
        var _a, _b, _c, _d, _e, _f;
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
            const matriz = (_c = resultados.tablero_matriz) !== null && _c !== void 0 ? _c : resultados.MatrizTablero;
            const historico = (_e = (_d = resultados.historico) !== null && _d !== void 0 ? _d : resultados.Historico) !== null && _e !== void 0 ? _e : [];
            if (data.Solucion && matriz) {
                printLog(`[Console Mensaje]: Vector Solucion en -> ${(_f = resultados.generaciones) !== null && _f !== void 0 ? _f : 0} generaciones!`, 'success');
                renderizarTablero(matriz);
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
