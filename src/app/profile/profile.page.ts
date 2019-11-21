import { UserService } from './../Database/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    userPosts

  constructor(
    private afs: AngularFirestore,
    private user: UserService
    ) {
    const posts = afs.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges()
  }

  ngOnInit() {
  }


  
}
