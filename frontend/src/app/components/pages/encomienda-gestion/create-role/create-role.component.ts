import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent {
  name: string = ''


  constructor(private mainService: MainService,
    private toastService: ToastrService
    ) {}

  submitForm():void {
    if (this.name != '') {
      this.mainService.createRole({name: this.name}).subscribe(
        (response:any) => {
          this.toastService.success(response.message);
          this.name = ''
        },
        err => {
          this.toastService.error('Error en el servidor, vuelve a intentarlo');
        }
      )
    } else {
      this.toastService.error('Tiene que ingresar un nombre');
    }
  }

}
