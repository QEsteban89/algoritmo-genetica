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

    def _evaluar_tablero(self, b: np.ndarray) -> int:
        M = len(b)

        ataque = 0

        for i in range(M):
            for j in range(i + 1, M):
                if(b[i] == b[j] or abs(b[i] - b[j]) == abs(i - j)):
                    ataque += 1
        return -ataque

    def _imprimir_board(self, b: np.ndarray):
        representacion = np.zeros((self.N, self.N), dtype=int)

        for i in range(self.N):
            fila = b[i]
            representacion[fila, i] = 1
        print(representacion)
