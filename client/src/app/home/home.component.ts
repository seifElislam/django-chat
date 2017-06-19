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
  constructor( private notify:NotifyService, private handler:ChatHandlerService)
  {
      this.notify.startChannel()
      this.notify.sendMessage('hello world')
      this.notify.reciveMessage()

   }

  ngOnInit() {

    this.handler.get_users().subscribe(data=>{
      this.list = data
      for (var i = 0; i < this.list.length; i++){

        console.log("i :",this.list[i].fields['username'])

         this.user.id = this.list[i].pk;
         this.user.username = this.list[i].fields['username'];

        this.users.push(this.user)
      }
       console.log('my list:',this.users)
    },error=>{
      console.log('error:',error)
    })
  }

}
