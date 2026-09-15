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

        hijo = np.empty(N, dtype=int)
        hijo[:punto] = padre[:punto]
        
        vistos = set(padre[:punto])
        
        faltantes = list(set(range(N)) - vistos)
        np.random.shuffle(faltantes)
        
        for i in range(punto, N):
            val = madre[i]
            if val not in vistos:
                hijo[i] = val
                vistos.add(val)
            else:
                hijo[i] = faltantes.pop()
                
        return hijo

    def _mutacion(self, item: np.ndarray) -> np.ndarray:
        if np.random.rand() < self.mutacion_ratio:
            i, j = np.random.randint(0, len(item), size=2)
            item[i], item[j] = item[j], item[i]
        return item

    def solucion(self, fit, cromosoma_tamaño: int):
        poblacion = self._crear_poblacion(cromosoma_tamaño)
        mejor_valor_historico = []
        
        mejor_individuo_global = poblacion[0]
        mejor_fit_global = float('-inf')

        for gen in range(self.generaciones):
            valor = np.array([fit(j) for j in poblacion])
            mejor_valor_actual = max(valor)
            mejor_valor_historico.append(int(mejor_valor_actual))

            indice_actual = np.argmax(valor)
            if valor[indice_actual] > mejor_fit_global:
                mejor_fit_global = valor[indice_actual]
                mejor_individuo_global = poblacion[indice_actual]

            if mejor_valor_actual == 0:
                print(f"Solución óptima encontrada en la generación {gen + 1}")
                return mejor_individuo_global, mejor_valor_historico

            padres = self._seleccion(poblacion, valor)

            poblacion_nueva = []
            for _ in range(self.poblacion_inicial):
                id_x, id_y = np.random.choice(len(padres), size=2, replace=False)
                hijo = self._crossover(padres[id_x], padres[id_y])
                hijo = self._mutacion(hijo)
                poblacion_nueva.append(hijo)
                
            poblacion = poblacion_nueva

        return mejor_individuo_global, mejor_valor_historico