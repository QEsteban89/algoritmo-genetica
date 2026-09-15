import numpy as np

class NReinas:
    def __init__(self, N):
        self.N = N
        if(self.N <= 0): 
            self.N = 8 #Estado por defecto
        else:
            #self.N = N
            print(f"El tamaño del tablero sera de {self.N}")

    def _crear_tablero(self) -> np.ndarray:
        return np.random.permutation(self.N)

    def _evaluar_tablero(self, tablero):
        N = len(tablero)
        colisiones = N - len(set(tablero))
        
        diag1 = tablero - np.arange(N)
        diag2 = tablero + np.arange(N)
        
        colisiones += (N - len(set(diag1)))
        colisiones += (N - len(set(diag2)))
        
        return -colisiones

    def _imprimir_board(self, b: np.ndarray):
        representacion = np.zeros((self.N, self.N), dtype=int)

        for i in range(self.N):
            fila = b[i]
            representacion[fila, i] = 1
        #print(representacion)
        return representacion
