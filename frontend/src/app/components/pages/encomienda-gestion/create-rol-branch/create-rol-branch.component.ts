import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-rol-branch',
  templateUrl: './create-rol-branch.component.html',
  styleUrls: ['./create-rol-branch.component.scss']
})
export class CreateRolBranchComponent implements OnInit {

  roles: any[] = [];
  branchs: any[] = [];
  selectedRoleId: number = 0;
  selectedBranchId: number = 0;
  rolBranchData = {
    branch: 0,
    role: 0,
    salary: 0,
  };

  constructor (private mainService: MainService,
    private toastService: ToastrService) {}

  ngOnInit(): void {
    this.updateBranch();
  }

  updateBranch(): void {
    this.mainService.getAllBranchEmployee().subscribe(
      (data: any[]) => {
        this.branchs = data;
        console.log(data)
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
    this.mainService.getNotAssignmentSalaryByBranch(this.selectedBranchId).subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      error => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  submitForm(): void {
    this.rolBranchData.branch = this.selectedBranchId;
    this.rolBranchData.role = this.selectedRoleId;
    if (!this.rolBranchData.branch || !this.rolBranchData.role || !this.rolBranchData.salary) {
      this.toastService.error('Por favor, complete todos los campos del formulario.');
      return;
    }
    this.mainService.createRoleBranch(this.rolBranchData).subscribe(
      (response) => {
        // console.log('Empleado creado:', response);
        this.toastService.success(response.message);
        this.rolBranchData.salary = 0
      },
      (error) => {
        this.toastService.error('Error en el servidor, vuelve a intentarlo');
      }
    );
  }

}
