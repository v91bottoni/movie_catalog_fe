import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRoles: string[] = route.data['expectedRoles'];
    const role = localStorage.getItem('role');
    let token: boolean = false;

    if(role == '') {
      this.router.navigateByUrl('/login');
      return false;
    }

    expectedRoles.forEach(element => {
      if(element == role)   token = true;
    });

    
    if(!token){
      this.router.navigateByUrl('/login');
      return false;
    }
    else{
      return true;
    }
  }
}
