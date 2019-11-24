import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from "rxjs/operators"


interface user {
    username: string,
    // email: string,
    // gender: string,
    // phoneNumber: string,
    // dob: Date,
    // isBlocked: boolean,
    uid: string
}

@Injectable()
export class UserService {
    private user: user
        
    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(user:user) {
        this.user = user
    }

    getUsername() {
        return this.user.username
    }

    reAuth(username: string, password: string) {
        return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@nu.edu.pk', password))
    }

    updatePassword(newpassword: string) {
        return this.afAuth.auth.currentUser.updatePassword(newpassword)
    }

    updateEmail(newEmail: string) {
        return this.afAuth.auth.currentUser.updateEmail(newEmail + '@nu.edu.pk')
    }

    getUID() {
        return this.user.uid       
    }

    async isAuthenticated() {
        if(this.user) return true

        const user = await this.afAuth.authState.pipe(first()).toPromise()

        if(user) {
            this.setUser({
                username: user.email.split('@')[0],
                uid: user.uid 
            })
            return true
        }
        return false
    }

}