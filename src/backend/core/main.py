''' 
import matplotlib.pyplot as plt
from NReinas import NReinas
from Genetica import Genetica

Problem = NReinas(16)
GA = Genetica(500, 10000, 0.5)

mejor_solucion, historia = GA.solucion(Problem._evaluar_tablero, Problem.N)

def main():
    if( mejor_solucion is not None):
        print("Vector Solucion: ", mejor_solucion)
        print(Problem._imprimir_board(mejor_solucion))

        plt.figure(figsize=(8, 5))
        plt.plot(historia, marker='o', color='b')
        plt.xlabel("Generación")
        plt.ylabel("Fitness ")
        plt.title("Convergencia del Algoritmo Genético")
        plt.grid(True)
        plt.show()       

if __name__ == '__main__':
    main()
'''

