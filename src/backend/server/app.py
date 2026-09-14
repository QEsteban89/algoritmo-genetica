import sys
import os
from flask import Flask, Response, jsonify, request

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from server.renderizar import Renderizar

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def render():
    data = request.get_json(silent=True) or {}

    tamanotablero = data.get('tamanoTablero', 8)
    poblacion = data.get('poblacionInicial', 100)
    generaciones = data.get('generacionesRatio', 500)
    mutacion = data.get('mutacionesRatio', 0.2)

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