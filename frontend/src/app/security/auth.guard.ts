import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  var token = localStorage.getItem("user");
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
