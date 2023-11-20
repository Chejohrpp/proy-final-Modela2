import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch.model';
import { AuthService } from 'src/app/services/auth.service';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user:any;
    branch:any;
    constructor(
      private router:Router,
      private authService:AuthService,
      private branchService: BranchService,
      private toastService:ToastrService
      ) { }

    ngOnInit() {
      this.user = this.authService.getEmployeeUser();
      this.branchService.getBranches().subscribe({
        next: (response:Branch[])=>{
          this.branch = response.find((b)=>{
            return b.id_branch == this.user.id_branch
          });
        },
        error: (error)=>{
          this.toastService.error("Error al obtener las sucursales para el empleado");
        }
      })
    }

    logout(){
      this.authService.logout();
    }
}
