import { UserService } from './../Database/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postID: string
  effect: string = ''
  post
  sub
  postReference: AngularFirestoreDocument

  heartType: string = "heart-empty"

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id')
    this.postReference = this.afs.doc(`posts/${this.postID}`)
    this.sub = this.postReference.valueChanges().subscribe(val => {
      this.post = val
      this.effect = val.effect
      this.heartType = val.likes.includes(this.user.getUID()) ? "heart" : "heart-empty"
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
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
