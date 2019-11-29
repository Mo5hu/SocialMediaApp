import { firestore } from 'firebase';
import { UserService } from './../Database/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  postID: string
  effect: string = ''
  post
  subb
  heartType: string = "heart-empty"
  postReference: AngularFirestoreDocument


  sub
  posts
  
  constructor(
    private aff: AngularFireFunctions,
    private route: ActivatedRoute,
    private user: UserService,
    private afs: AngularFirestore

    ) { }

  ngOnInit() {
    const getFeed = this.aff.httpsCallable('getFeed')
    this.sub = getFeed({}).subscribe(data => {
      console.log(data)
      this.posts = data
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  onCall(){
    const getFeed = this.aff.httpsCallable('getFeed')
    this.sub = getFeed({}).subscribe(data => {
      console.log(data)
      this.posts = data
    })
  }

  toggleHeart() {
    if(this.heartType === 'heart-empty') {
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID)
      })
    }
  }

}
