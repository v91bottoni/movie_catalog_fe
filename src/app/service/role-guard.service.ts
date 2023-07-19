import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private router: Router, private util:UtilityService) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRoles: string[] = route.data['expectedRoles'];
    const role = sessionStorage.getItem('role');
    let token: boolean = false;

    if(role == '') {
      this.util.username = null;
      this.util.role = null;
      this.router.navigateByUrl('/login');
      return false;
    }

    expectedRoles.forEach(element => {
      if(element == role)   token = true;
    });


    if(!token){
      this.util.username = null;
      this.util.role = null;
      this.router.navigateByUrl('/login');
      return false;
    }
    else{
      return true;
    }
  }
}
