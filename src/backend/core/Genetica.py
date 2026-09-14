import numpy as np

class Genetica:
    def __init__(self, poblacion_inicial, generaciones, mutacion_ratio):
        self.poblacion_inicial = poblacion_inicial if poblacion_inicial > 0 else 100
        self.generaciones = generaciones if generaciones > 0 else 500
        self.mutacion_ratio = mutacion_ratio if mutacion_ratio > 0 else 0.2

        print("Se inicializó el algoritmo genético con estos valores:\n")
        print(f"Población Inicial: {self.poblacion_inicial}")
        print(f"Generaciones: {self.generaciones}")
        print(f"Ratio de Mutación: {self.mutacion_ratio}\n")

    def _crear_poblacion(self, cromosoma: int) -> list:
        return [np.random.permutation(cromosoma) for _ in range(self.poblacion_inicial)]

    def _seleccion(self, poblacion: list, fit_valor: np.ndarray):
        numero_parientes = int(len(fit_valor) / 2)
        indices = np.argsort(fit_valor)[-numero_parientes:]
        return [poblacion[i] for i in indices]

    def _crossover(self, padre: np.ndarray, madre: np.ndarray) -> np.ndarray:
        N = len(padre)
        punto = np.random.randint(1, N - 1)
        hijo = np.concatenate((padre[:punto], madre[punto:]))

        unico_valor = set(hijo)
        valor_perdido = list(set(range(N)) - unico_valor)
        np.random.shuffle(valor_perdido)

        for i in range(N):
            if list(hijo).count(hijo[i]) > 1:
                hijo[i] = valor_perdido.pop()
        return hijo

    def _mutacion(self, item: np.ndarray) -> np.ndarray:
        if np.random.rand() < self.mutacion_ratio:
            i, j = np.random.randint(0, len(item), size=2)
            item[i], item[j] = item[j], item[i]
        return item

    def solucion(self, fit, cromosoma_tamaño: int):
        poblacion = self._crear_poblacion(cromosoma_tamaño)
        mejor_valor_historico = []

        for gen in range(self.generaciones):
            valor = np.array([fit(j) for j in poblacion])
            mejor_valor = max(valor)
            mejor_valor_historico.append(mejor_valor)

            if mejor_valor == 0:
                mejor_indice = np.argmax(valor)
                print(f"Solución óptima encontrada en la generación {gen + 1}")
                return poblacion[mejor_indice], mejor_valor_historico

            padres = self._seleccion(poblacion, valor)

            poblacion_nueva = []
            for _ in range(self.poblacion_inicial):
                id_x, id_y = np.random.choice(len(padres), size=2, replace=False)
                hijo = self._crossover(padres[id_x], padres[id_y])
                hijo = self._mutacion(hijo)
                poblacion_nueva.append(hijo)
                
            poblacion = poblacion_nueva

        return None, mejor_valor_historico