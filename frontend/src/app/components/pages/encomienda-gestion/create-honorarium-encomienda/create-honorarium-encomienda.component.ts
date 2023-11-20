import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-honorarium-encomienda',
  templateUrl: './create-honorarium-encomienda.component.html',
  styleUrls: ['./create-honorarium-encomienda.component.scss']
})
export class CreateHonorariumEncomiendaComponent implements OnInit {
  selectedEmployee: any = null;
  honorarioData = {
    employee: 0,
    hours: 1,
    amount: 0,
    date: null
  };
  full_name = '';
  employees: any[] = [];

  constructor(private mainService: MainService,private toastService: ToastrService) {}

  ngOnInit(): void {
    this.mainService.getemployeesSalary().subscribe(
      (data: any[]) => {
        this.employees = data;
        this.selectedEmployee = this.employees[0].id_employee;
        console.log(this.selectedEmployee)
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSalary(): void {
    if (this.selectedEmployee) {
      // Calcula el salario por horas extras
      const employee = this.employees.find(emp => emp.id_employee === Number(this.honorarioData.employee));
      this.full_name = employee.first_name + ' ' + employee.last_name
      const hourlySalary = parseFloat(employee.salary) / 8;
      this.honorarioData.amount = this.honorarioData.hours * (hourlySalary * 0.5 + hourlySalary );
    }
  }

  submitForm(): void {
    // Verifica que la información necesaria no esté vacía
    if (
      this.honorarioData.employee !== 0 &&
      this.honorarioData.hours > 0 &&
      this.full_name !== '' &&
      this.honorarioData.date !== null
    ) {
      // Envía los datos del honorario
      this.mainService.inserthonorarium(this.honorarioData).subscribe(
        () => {
          // Muestra un mensaje de éxito
          // console.log('Honorarium added successfully');
          this.toastService.success('Honorario agregado con exito')
        },
        error => {
          // console.error('Error adding honorarium:', error);
          this.toastService.error('Error en el servidor, vuelve a intentarlo');
        }
      );
    }
  }
}
