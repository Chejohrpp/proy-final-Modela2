import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Param } from 'src/app/models/param.model';
import { ParamService } from 'src/app/services/param.service';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss']
})
export class ParamComponent implements OnInit {

  params: Param[] = [];
  constructor(
    private paramService: ParamService,
    private toastService: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.paramService.getParams().subscribe({
      next:(response:Param[])=>{
        this.params = response;
      },
      error:(error:any)=>{
        this.toastService.error("Error al traer los parametros de la base de datos");
      }
    })
  }

  updateParams(){
    this.params.forEach((param)=>{
      this.paramService.updateParam(param).subscribe({
        next: (response:any)=>{
          this.toastService.success(response.message);
        },
        error: (error:any)=>{
          this.toastService.error(error.error.error);
        }
      })
    });
  }
}
