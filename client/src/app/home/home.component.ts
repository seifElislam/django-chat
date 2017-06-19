import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { ChatHandlerService } from '../services/chat-handler.service'
import {User} from '../models/User';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list:any[]
  user={id:0,username:"",status:0}
  users:any[]=[]
  currentFriend:any
  currentUser:any
  constructor( private notify:NotifyService, private handler:ChatHandlerService)
  {
      // this.notify.startChannel()
      // this.notify.sendMessage('hello world')
      // this.notify.reciveMessage()
      this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      console.log("me :", this.currentUser.username)

   }

  ngOnInit() {
    this.notify.startChannel()
    this.notify.sendMessage('hello world')
    this.notify.reciveMessage()
    this.incomeMessages()
    this.handler.get_users().subscribe(data=>{
      this.list = data
      for (var i = 0; i < this.list.length; i++){
        console.log("i :",this.list[i].fields['username'])
        let user={id:0,username:"",status:"offline"}
        if(this.currentUser.id != this.list[i].pk){
         user.id = this.list[i].pk;
         user.username = this.list[i].fields['username'];
         this.users.push(user)
       }
      }
       console.log('my list:',this.users)
    },error=>{
      console.log('error:',error)
    })
  }

  onSelect(user: User): void {
    console.log("selection:",user)
    this.currentFriend = user
  }

  incomeMessages(){
    if (this.notify.reciveMessage){console.log("i did it ")}
  }

}
