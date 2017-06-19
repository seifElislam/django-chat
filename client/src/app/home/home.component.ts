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
  online:any[]=[]
  constructor( private notify:NotifyService, private handler:ChatHandlerService)
  {
      // this.notify.startChannel()
      // //this.notify.sendMessage('hello world')
      // this.notify.reciveMessage()
      this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      console.log("me :", this.currentUser.username)

   }

  ngOnInit() {
    this.notify.startChannel()
    // this.notify.sendMessage('hello world')
    // this.notify.reciveMessage()

    this.handler.get_users().subscribe(data=>{
      this.list = data
      for (var i = 0; i < this.list.length; i++){
        // console.log("i :",this.list[i].fields['username'])
        let user={id:0,username:"",status:"offline", login:false}
        if(this.currentUser.id != this.list[i].pk){
         user.id = this.list[i].pk;
         user.username = this.list[i].fields['username'];
         this.users.push(user)
       }
      }

       console.log('my list:',this.users)
       this.incomeMessages()
    },error=>{
      console.log('error:',error)
    })
  }

  onSelect(user: User): void {
    console.log("selection:",user)
    this.currentFriend = user
  }

  incomeMessages(){

    this.notify.reciveMessage().subscribe((msg)=> {
            console.log("nextttt", msg.data);
            var backMsg = JSON.parse(msg.data)
            console.log("back msg:",backMsg)
            if(backMsg.type == "new login"){
               console.log("some one come",backMsg.user)
               for(var x = 0; x < backMsg.user.length; x++){
                 console.log("x :",x)
                 this.online.push(backMsg.user[x])
                 for (var i = 0; i < this.users.length; i++){
                   console.log("i :",i)
                   if(backMsg.user[x] == this.users[i].id){
                     console.log(this.users[i].username," comes")
                     this.users[i].status="online"
                     this.users[i].login=true
                   }
                   else{console.log("not ofund")}
                 }
               }

            }
            if(backMsg.type == "logout"){
              console.log("some one out",backMsg.user)
              for(var x = 0; x < backMsg.user.length; x++){
                for (var i = 0; i < this.users.length; i++){
                  if(backMsg.user[x] == this.users[i].id){
                    console.log(this.users[i].username," out")
                    this.users[i].status="offline"
                    this.users[i].login=false
                    var index = this.online.indexOf(backMsg.user[x]);
                    this.online.splice(index, 1);
                  }
                  else{console.log("not ofund")}
                }
              }
            }
        },
        (msg)=> {
            console.log("errorss", msg);
        },
        ()=> {
            console.log("complete");
        })


  }
  ngDoCheck(){
    console.log("new check")
    this.incomeMessages()
    if(this.users.length>0){
      console.log("now if full")
      // console.log("length :",this.online.length)
      for(let x=0; x<this.online.length;x++){
        // console.log("users length :",this.users.length)
        // console.log(this.online[x])
        for(let i=0;i<this.users.length;i++){
          // console.log("==",this.users[i].id)
          if(this.online[x]==this.users[i].id){
            this.users[i].status="online"
             this.users[i].login=true
          }
        }
      }
    }
  }

}
