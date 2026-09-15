export function renderizarTablero(matriz: number[][], vectorSolucion?: number[]): void {
  const contenedor = document.querySelector('.tablero') as HTMLElement;
  if (!contenedor) return;

  const N = matriz.length;
  const textoVector = vectorSolucion ? `[${vectorSolucion.join(', ')}]` : '';

  contenedor.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
      <div class="tablero-grid" style="--N: ${N}"></div>
      ${textoVector ? `<div style="font-family: monospace; font-size: 0.85rem; font-weight: bold; color: #0284c7; background: #e0f2fe; padding: 6px 12px; border-radius: 4px; max-width: 90vw; overflow-x: auto; white-space: nowrap;">Vector Solución: ${textoVector}</div>` : ''}
    </div>
  `;
  const tableroGrid = contenedor.querySelector('.tablero-grid') as HTMLElement;

  // Tamaño dinámico del icono proporcional a N
  const fontSizeRem = Math.max(0.2, Math.min(1.4, 20 / N));

  for (let f = 0; f < N; f++) {
    for (let c = 0; c < N; c++) {
      const esClara = ((f + c) % 2 === 0);
      const casilla = document.createElement('div');
      casilla.className = `casilla ${esClara ? 'clara' : 'oscura'}`;

      if (matriz[f][c] === 1) {
        const reina = document.createElement('span');
        reina.className = 'reina';
        reina.style.fontSize = `${fontSizeRem}rem`;
        reina.textContent = '♛';
        casilla.appendChild(reina);
      }

      tableroGrid.appendChild(casilla);
    }
  }
}

export function renderizarGrafica(historico: number[]): void {
  const canvas = document.getElementById('fitnessChart') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = canvas.clientWidth || 400;
  canvas.height = canvas.clientHeight || 180;

  const width = canvas.width;
  const height = canvas.height;
  const paddingX = 40;
  const paddingY = 30;

  ctx.clearRect(0, 0, width, height);

  if (!historico || historico.length === 0) return;

  const maxVal = Math.max(...historico, 1);
  const minVal = Math.min(...historico);
  const rango = (maxVal - minVal) || 1;
  const totalGen = historico.length;

  ctx.beginPath();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.moveTo(paddingX, 15);
  ctx.lineTo(paddingX, height - paddingY);
  ctx.lineTo(width - 15, height - paddingY);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Gen 0', paddingX, height - 10);
  ctx.fillText(`Gen ${totalGen - 1}`, width - 25, height - 10);

  ctx.beginPath();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2.5;

  historico.forEach((val, i) => {
    const x = paddingX + (i / (totalGen - 1 || 1)) * (width - paddingX - 25);
    const y = (height - paddingY) - ((val - minVal) / rango) * (height - paddingY - 30);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  const firstX = paddingX;
  const firstY = (height - paddingY) - ((historico[0] - minVal) / rango) * (height - paddingY - 30);
  
  const lastX = paddingX + (width - paddingX - 25);
  const lastY = (height - paddingY) - ((historico[historico.length - 1] - minVal) / rango) * (height - paddingY - 30);

  ctx.beginPath();
  ctx.fillStyle = '#0284c7';
  ctx.arc(firstX, firstY, 4, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = '#22c55e';
  ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(`${historico[0]} col.`, firstX + 18, firstY - 6);
  ctx.fillText(`${historico[historico.length - 1]} col.`, lastX, lastY - 8);
}