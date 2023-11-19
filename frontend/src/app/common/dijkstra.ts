export class dijkstra {
	private vertices: number;
	private matrix: number[][];

	constructor(vertices: number) {
		this.vertices = vertices;
		this.matrix = [];

		for (let i = 0; i < vertices; i++) {
			this.matrix[i] = [];
			for (let j = 0; j < vertices; j++) {
				this.matrix[i][j] = 0;
			}
		}
	}

	addEdge(src: number, dest: number, weight: number) {
		this.matrix[src][dest] = weight;
		this.matrix[dest][src] = weight; // Si el grafo es no dirigido, añadir esta línea
	}

	dijkstra(startVertex: number) {
		const dist: number[] = [];
		const visited: boolean[] = [];

		for (let i = 0; i < this.vertices; i++) {
			dist[i] = Infinity;
			visited[i] = false;
		}

		dist[startVertex] = 0;

		for (let count = 0; count < this.vertices - 1; count++) {
			const u = this.minDistance(dist, visited);
			visited[u] = true;

			for (let v = 0; v < this.vertices; v++) {
				if (!visited[v] && this.matrix[u][v] !== 0 && dist[u] !== Infinity && dist[u] + this.matrix[u][v] < dist[v]) {
					dist[v] = dist[u] + this.matrix[u][v];
				}
			}
		}

		this.printSolution(dist);
	}

	private minDistance(dist: number[], visited: boolean[]): number {
		let min = Infinity;
		let minIndex = -1;

		for (let v = 0; v < this.vertices; v++) {
			if (!visited[v] && dist[v] <= min) {
				min = dist[v];
				minIndex = v;
			}
		}

		return minIndex;
	}

	private printSolution(dist: number[]) {
		console.log("Distancias mínimas desde el vértice fuente:");
		for (let i = 0; i < this.vertices; i++) {
			console.log(`${i} -> ${dist[i]}`);
		}
	}
	getShortestPath(startVertex: number, targetVertex: number): number[] {
		const dist: number[] = [];
		const visited: boolean[] = [];
		const previous: number[] = [];

		for (let i = 0; i < this.vertices; i++) {
			dist[i] = Infinity;
			visited[i] = false;
			previous[i] = -1;
		}

		dist[startVertex] = 0;

		for (let count = 0; count < this.vertices - 1; count++) {
			const u = this.minDistance(dist, visited);
			visited[u] = true;

			for (let v = 0; v < this.vertices; v++) {
				if (!visited[v] && this.matrix[u][v] !== 0 && dist[u] !== Infinity && dist[u] + this.matrix[u][v] < dist[v]) {
					dist[v] = dist[u] + this.matrix[u][v];
					previous[v] = u;
				}
			}
		}

		return this.buildPath(previous, startVertex, targetVertex);
	}

	private buildPath(previous: number[], startVertex: number, targetVertex: number): number[] {
		const path: number[] = [];
		for (let at = targetVertex; at !== -1; at = previous[at]) {
			path.unshift(at);
		}

		if (path[0] === startVertex) {
			return path;
		} else {
			console.log(`No hay ruta desde ${startVertex} a ${targetVertex}`);
			return [];
		}
	}
}