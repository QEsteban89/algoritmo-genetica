import sys
import os
from pathlib import Path
from flask import Flask, jsonify, request, render_template

SERVER_DIR = Path(__file__).resolve().parent
BACKEND_DIR = SERVER_DIR.parent
SRC_DIR = BACKEND_DIR.parent

sys.path.append(str(SRC_DIR))
sys.path.append(str(BACKEND_DIR))

from renderizar import Renderizar

FRONTEND_DIR = SRC_DIR / "frontend"

app = Flask(
    __name__,
    template_folder=str(FRONTEND_DIR / "template"),
    static_folder=str(FRONTEND_DIR)
)

@app.route('/', methods=['GET', 'POST'])
def render():
    if request.method == 'GET':
        return render_template('index.html')

    data = request.get_json(silent=True) or {}

    tamanotablero = int(data.get('tamanoTablero', 8))
    poblacion = int(data.get('poblacionInicial', 100))
    generaciones = int(data.get('generacionesRatio', 500))
    mutacion = float(data.get('mutacionesRatio', 0.2))

    r = Renderizar(
        tamanoTablero=tamanotablero,
        poblacionInicial=poblacion,
        generacionesRatio=generaciones,
        mutacionesRatio=mutacion
    )

    resultado = r.ExportJSON()
    return jsonify(resultado), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)