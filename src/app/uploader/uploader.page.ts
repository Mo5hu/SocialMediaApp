import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './../Database/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { firestore } from 'firebase';
import { getLocaleDateFormat } from '@angular/common';
import { stringify } from 'querystring';
import { delay } from 'q';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string
  desc: string
  busy: boolean = false
  noFace: boolean = false

  scaleCrop: string = "-/scale_crop/200x200"

  effects = {
    effect1: '',
    effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
    effect3: '-/filter/vevera/150/',
    effect4: '-/filter/carris/150/',
    effect5: '-/filter/misiara/150/'
  }

  activeEffect: string = this.effects.effect1

  @ViewChild('fileButton', {static: false}) fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async createPost() {

    this.busy = true

    const image = this.imageURL
    const desc = this.desc
    const activeEffect = this.activeEffect

    // const date = getLocaleDateFormat
    // const isBlocked:boolean = false 

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      likes: [],
      effect: activeEffect
    })

    this.busy = false
    this.imageURL = ""
    this.desc = ""

    const alert = await this.alertController.create({
      header: "Done",
      message: "Your Post has been Uploaded",
      buttons: ["Cool!"]
    })

    await alert.present()

    this.router.navigate(['/tabs/feed'])
    
  }

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect]
  }

  uploadFile(){
    this.fileButton.nativeElement.click()
  }

  async fileChanged(event) {

    this.busy = true

    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '79e8e9507575a82a170f')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
      this.busy = false
      this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
      .subscribe(event => {
        this.noFace = event.json().faces == 0
      })
    })
    
  }

}


        // date,
        // isBlocked,