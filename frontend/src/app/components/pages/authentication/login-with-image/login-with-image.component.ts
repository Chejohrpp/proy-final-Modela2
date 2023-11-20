import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-with-image',
  templateUrl: './login-with-image.component.html',
  styleUrls: ['./login-with-image.component.scss']
})
export class LoginWithImageComponent implements OnInit {
  email = "";
  password = "";

  constructor(
    private toastService:ToastrService,
    private loginService:LoginService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  login(){
    var loginRequest = new LoginRequest();
    loginRequest.email = this.email;
    loginRequest.password = this.password;
    this.loginService.login(loginRequest).subscribe({
      next: (response:any)=>{
        if (response.length>0){
          this.authService.setEmployeeUser(response[0]);
          console.log(response);
          this.toastService.success("Login completo!");
          this.router.navigate(['branch/new']);
        } else {
          this.toastService.error("Credenciales incorrectas");
        }
      },
      error: (response:any)=>{
        this.toastService.error("Error en el servidor");
      }
    })
  }

}
