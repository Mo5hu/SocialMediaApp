import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { UserService } from './../Database/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Subscribable, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument  
  userPosts
  sub
  posts: string
  username: string
  profilePic: string

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router
    ) {
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts
        this.username = event.username
        this.profilePic = event.profilePic
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngOnInit() {
  }

  goTo(postID: string) {
    this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
  }

  
}
