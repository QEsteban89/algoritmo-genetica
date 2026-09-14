from core.Genetica import Genetica
from core.NReinas import NReinas

class Renderizar:
    def __init__(self, tamanoTablero, poblacionInicial, generacionesRatio, mutacionesRatio):
        self.tamanoTablero = tamanoTablero
        self.generacionesRatio = generacionesRatio
        self.poblacionInicial = poblacionInicial
        self.mutacionesRatio = mutacionesRatio

        self.problemaReina = NReinas(self.tamanoTablero)
        self.algoritmoGenetica = Genetica(
            self.poblacionInicial,
            self.generacionesRatio,
            self.mutacionesRatio,
        )

        print("||================== Informacion del Algoritmo ==================||")
        print(f"||Tamaño del Tablero {self.tamanoTablero}                        ||")
        print(f"||Generaciones Ratio {self.generacionesRatio}                    ||")
        print(f"||Poblacion Inicial  {self.poblacionInicial}                     ||")
        print(f"||Mutaciones Ratio {self.mutacionesRatio}                        ||")

    def ExportJSON(self):
        MejorSolucion, Historico = self.algoritmoGenetica.solucion(
            self.problemaReina._evaluar_tablero,
            self.tamanoTablero,
        )

        if(MejorSolucion is None):
            return {
                "Solucion" : False,
                "Log": "No se encontro una solucion"
            }

        SolucionesListas = MejorSolucion.tolist() if hasattr(MejorSolucion, 'tolist') else list(MejorSolucion)
        HistoricoLista = [int(val) for val in Historico]

        MatrizTablero = self.problemaReina._imprimir_board(MejorSolucion)
        matriz_lista = MatrizTablero.tolist() if hasattr(MatrizTablero, 'tolist') else MatrizTablero

        return {
            "Solucion": True,
            "Parametros": {
                "tamano_tablero" : self.tamanoTablero,
                "poblacion_inicial": self.poblacionInicial,
                "generaciones": self.generacionesRatio,
                "mutaciones_ratio": self.mutacionesRatio
            },
            "Resultados": {
                "generaciones" : len(HistoricoLista),
                "vector_solucion": SolucionesListas,
                "tablero_matriz": matriz_lista,
                "historico": HistoricoLista
            }
        }



