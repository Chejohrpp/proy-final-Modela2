import { Component, OnInit } from '@angular/core';
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
  selectedRoleId: number = 0;
  selectedBranchId: number = 0;
  employeeData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_assignment: 0, // Podrías establecer un valor predeterminado si es necesario
    payment_salary: 0 // Podrías establecer un valor predeterminado si es necesario
  };

  constructor(private mainService: MainService) {}

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
      this.employeeData.role_assignment = selectedRole.id_ra
      this.employeeData.payment_salary = selectedRole.salary
    } else {
      this.salary = 0; // Valor por defecto si no se encuentra el rol seleccionado
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
        // Restablecer el formulario o tomar otras acciones después de crear el empleado
      },
      (error) => {
        console.error('Error al crear el empleado:', error);
        // Manejar el error aquí
      }
    );
  }

}
