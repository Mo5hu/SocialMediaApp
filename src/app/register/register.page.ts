import { UserService } from './../Database/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""
  email: string = ""
  pno: string = ""
  gender: string = ""
  isBlocked: boolean = false

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this
    if(password !== cpassword) {
      this.showAlert('Error!', "Passwords don't match")
      return console.error("Passwords don't Match!")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@nu.edu.pk', password )
      console.log(res)

      this.afstore.doc(`users/${res.user.uid}`).set({
				username
			})


			this.user.setUser({
				username,
				uid: res.user.uid
      })
                  
      this.showAlert("Success!", "Welcome aboard")
      this.router.navigate(['/tabs'])
    } catch(error) {
      this.showAlert("Error!", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    })

    await alert.present()
  }





}
          // email,
          // gender,
          // dob,
          // isBlocked,
          // phoneNumber,
          