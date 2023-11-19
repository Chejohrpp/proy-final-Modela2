import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-honorarium-table-encomienda',
  templateUrl: './honorarium-table-encomienda.component.html',
  styleUrls: ['./honorarium-table-encomienda.component.scss']
})
export class HonorariumTableEncomiendaComponent implements OnInit {
  honorariumData: any[] = [];

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getTableHonorarium().subscribe(
      (data: any[]) => {
        this.honorariumData = data.map(item => ({
          Posicion: item.Posicion,
          Nombre: item.Nombre,
          Apellido: item.Apellido,
          Email: item.Email,
          'Horas extras': item.Horas_extras,
          Ganancias: item.Ganancias
        }));
      },
      error => {
        console.error(error);
      }
    );
  }
}
