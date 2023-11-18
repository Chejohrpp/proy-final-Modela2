import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-employee-encomienda',
  templateUrl: './create-employee-encomienda.component.html',
  styleUrls: ['./create-employee-encomienda.component.scss']
})
export class CreateEmployeeEncomiendaComponent implements OnInit {

  roles: any[] = []; // Variable para almacenar los roles obtenidos

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data; // Guardar los roles en la variable roles
      },
      error => {
        console.error('Error al obtener roles:', error);
      }
    );
  }


}
