export class Dijkstra {
	private nodos: Grafo;
	private peso: { [arista: string]: number };

	constructor(nodos: Grafo, peso: { [arista: string]: number }) {
		this.nodos = nodos;
		this.peso = peso;
	}

	calcularDistanciaMinima(inicio: number, final: number): number {
		const distancias: { [nodo: number]: number } = {};
		const colaPrioridad: [number, number][] = [];

		for (const nodo in this.nodos) {
			distancias[parseInt(nodo)] = Infinity;
		}

		distancias[inicio] = 0;
		colaPrioridad.push([0, inicio]);

		while (colaPrioridad.length > 0) {
			const [distanciaActual, nodoActual] = colaPrioridad.shift() || [0, 0];

			if (nodoActual === final) {
				break;
			}

			for (const vecino in this.nodos[nodoActual]) {
				const distanciaNueva = distanciaActual + this.peso[`${nodoActual}-${vecino}`];

				if (distanciaNueva < distancias[parseInt(vecino)]) {
					distancias[parseInt(vecino)] = distanciaNueva;
					colaPrioridad.push([distanciaNueva, parseInt(vecino)]);
					colaPrioridad.sort((a, b) => a[0] - b[0]);
				}
			}
		}

		return distancias[final];
	}
}

export type Grafo = { [nodo: number]: { [vecino: number]: number } };