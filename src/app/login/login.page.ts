import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './../Database/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""


  constructor(
    public afAuth: AngularFireAuth, 
    public user:UserService,
    public router: Router,
    private alert: AlertController
    ) { }

  ngOnInit() {
  }

  // Abcxyz + asd.com
  async login() {
    const { username, password } = this
    try {
        // Sasta hack for Nu Students
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@nu.edu.pk', password)
        
        if(res.user) {
          this.user.setUser({
            username,
            uid: res.user.uid
          })
          this.router.navigate(['/tabs'])
        }

    } catch(err) {
      this.showAlert("Error!", err.message + "\nDon't use 'space', '/', '\', '|'... characters")
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
