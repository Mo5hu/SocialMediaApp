import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService implements CanActivate{
            
    constructor(
        private router: Router,
        private user: UserService
        ) {
    }

    async canActivate(route){
        if(await this.user.isAuthenticated()) {
            // Fine
            return true
        }
        this.router.navigate(['/login']) 
        return false
    }

}