import { UserService } from './../Database/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { firestore } from 'firebase';
import { getLocaleDateFormat } from '@angular/common';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string
  desc: string

  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  createPost() {
    const image = this.imageURL
    const desc = this.desc
    // const date = getLocaleDateFormat
    // const isBlocked:boolean = false 

    this.afstore.doc(`users/${this.user.getUID()}`).update({
			posts: firestore.FieldValue.arrayUnion({
        image,
        desc
      })
    })
  }

  uploadFile(){
    this.fileButton.nativeElement.click()
  }

  async fileChanged(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '79e8e9507575a82a170f')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
    });
    
  }

}


        // date,
        // isBlocked,