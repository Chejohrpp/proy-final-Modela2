import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Obtener el usuario del localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
  
      // Verificar si el id_role es igual a 1
      if (userData && userData.id_role === 1) {
        // Permitir acceso a las rutas que requieren id_role 1
        return true;
      } else {
        // Redirigir a otra página o bloquear acceso
        this.router.navigate(['/monthly-goals']); // Cambia '/otra-ruta' por la ruta a la que quieres redirigir
        return false;
      }
    }
  }
