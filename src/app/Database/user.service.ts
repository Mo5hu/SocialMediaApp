import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


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

    getUID() {
        if(!this.user) {
            if(this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    username: user.email.split('@')[0],
                    uid: user.uid
                })
                return user.uid
            } else {
                throw new Error("User not Logged in");
            }
        } else {
            return this.user.uid;
        }       
    }

}