export interface AlgoritmoConfig {
  tamanoTablero: number;
  poblacionInicial: number;
  generacionesRatio: number;
  mutacionesRatio: number;
}

export function printLog(message: string, type: 'info' | 'error' | 'success' = 'info'): void {
  const logContainer = document.getElementById('log-output');
  if (!logContainer) return;

  const entry = document.createElement('p');
  entry.className = `log-${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

  logContainer.appendChild(entry);
  logContainer.scrollTop = logContainer.scrollHeight;
}