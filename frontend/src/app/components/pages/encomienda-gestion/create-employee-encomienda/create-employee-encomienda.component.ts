import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-employee-encomienda',
  templateUrl: './create-employee-encomienda.component.html',
  styleUrls: ['./create-employee-encomienda.component.scss']
})
export class CreateEmployeeEncomiendaComponent implements OnInit {
  roles: any[] = [];
  branchs: any[] = [];
  salary: number = 0;
  current_salary: number = 0;
  salary_per_hour: number = 0;
  selectedRoleId: number = 0;
  selectedBranchId: number = 0;
  employeeData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    hours: 8,
    role_assignment: 0, // Podrías establecer un valor predeterminado si es necesario
    payment_salary: 0 // Podrías establecer un valor predeterminado si es necesario
  };

  constructor(private mainService: MainService, private toastService: ToastrService) {}

  ngOnInit(): void {
    this.updateBranch();
  }

  updateBranch(): void {
    this.mainService.getAllBranchEmployee().subscribe(
      (data: any[]) => {
        this.branchs = data;
        // Puedes configurar el valor inicial seleccionado aquí si lo necesitas
        this.selectedBranchId = this.branchs[0].id_branch;
        this.updateRoles();
      },
      error => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  updateRoles(): void {
    this.mainService.getRolesSalaryByBranch(this.selectedBranchId).subscribe(
      (data: any[]) => {
        this.roles = data;
        // Puedes configurar el valor inicial seleccionado aquí si lo necesitas
         // Validar si roles tiene elementos antes de acceder a su propiedad id_role
         if (this.roles.length > 0 && this.roles[0].id_role) {
          this.salary = this.roles[0].id_role;
          this.selectedRoleId = this.roles[0].id_role;
          this.updateSalary();
        } else {
          console.error('El objeto roles no tiene la estructura esperada');
          this.salary = null;
          this.current_salary = null;
        }
      },
      error => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  updateSalary(): void {
    const selectedRole = this.roles.find(role => role.id_role === Number(this.selectedRoleId));
    if (selectedRole) {
      this.salary = selectedRole.salary;
      this.salary_per_hour = this.salary/8
      this.employeeData.role_assignment = selectedRole.id_ra
      this.updateCurrentSalary();
    } else {
      this.salary = 0; // Valor por defecto si no se encuentra el rol seleccionado
      this.current_salary = 0;
    }
  }

  updateCurrentSalary(): void {
    if (this.salary !== 0 ) {
      this.current_salary = this.salary_per_hour * this.employeeData.hours;
      this.employeeData.payment_salary = this.current_salary
    }else {
      this.current_salary = 0;
    }
  }

  submitForm(): void {
    console.log(this.employeeData)
    if (!this.employeeData.first_name || !this.employeeData.last_name || !this.employeeData.email || !this.employeeData.password) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    this.mainService.createEmployee(this.employeeData).subscribe(
      (response) => {
        console.log('Empleado creado:', response);
        this.toastService.success(response.message);
      },
      (error) => {
        console.error('Error al crear el empleado:', error);
        this.toastService.error('Error en el servidor, vuelve a intentarlo');
      }
    );
  }

  

}
