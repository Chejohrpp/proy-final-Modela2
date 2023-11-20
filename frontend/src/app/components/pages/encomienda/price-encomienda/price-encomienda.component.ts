import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dijkstra } from 'src/app/common/dijkstra';
import { Param } from 'src/app/models/param.model';
import { ParamService } from 'src/app/services/param.service';

@Component({
  selector: 'app-price-encomienda',
  templateUrl: './price-encomienda.component.html',
  styleUrls: ['./price-encomienda.component.scss']
})
export class PriceEncomiendaComponent implements OnInit {

  resultado: any;
  prices: Param[]= [];

  constructor(
    private paramService:ParamService,
    private toastService:ToastrService
  ) {

  }

  ngOnInit(): void {
    // Ejemplo de uso
    const graph = new dijkstra(6);

    graph.addEdge(0, 1, 4);
    graph.addEdge(0, 2, 2);
    graph.addEdge(1, 2, 5);
    graph.addEdge(1, 3, 10);
    graph.addEdge(2, 4, 3);
    graph.addEdge(4, 3, 4);
    graph.addEdge(3, 5, 7);

    const startVertex = 4;
    const targetVertex = 2;

    const shortestPath = graph.getShortestPath(startVertex, targetVertex);

    if (shortestPath.length > 0) {
      this.resultado = `La ruta más corta desde ${startVertex} a ${targetVertex} es: ${shortestPath.join(' -> ')}`;
    }
    this.paramService.getDataPrices().subscribe({
      next:(response:Param[])=>{
        this.prices = response;
      },
      error: (error:any)=>{
        this.toastService.error(error.error.error);
      }
    })
  }
}
