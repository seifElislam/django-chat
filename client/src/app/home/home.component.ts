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

  inbox:any[]=[]
  msgs:any[]=[]
  list:any[]
  msg_list:any[]
  user={id:0,username:"",status:0}
  users:any[]=[]
  currentFriend:any=false
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
    this.get_allusers()
    this.get_msgs()
    this.incomeMessages()

  }

  onSelect(user: User): void {

    console.log("selection:",user)
    this.currentFriend = user
    this.chatHundler()
  }

  incomeMessages(){

    this.notify.reciveMessage().subscribe((msg)=> {
            console.log("new msg form server", msg.data);
            var backMsg = JSON.parse(msg.data)
            console.log("back msg:",backMsg)
            if(backMsg.type == "new login"){
              this.get_allusers()
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
            if(backMsg.type == "msg"){
              console.log("new msg need to be handled")
              let message = backMsg.content.split("/")
              console.log("after processing",message)
              let inbox = {from:message[0],to:message[2],content:message[1]}
              this.inbox.push(inbox)
              console.log("my inbox , ",this.inbox)
              this.chatHundler()
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
    // this.get_allusers()
    console.log("new check")
    // this.incomeMessages()
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
  get_allusers(){
    let current = this.users.length
    console.log("now users are:", current)
    this.list=[]

    this.handler.get_users().subscribe(data=>{
      this.list = data
      if(this.list.length>current){
        this.users=[]
        console.log("new users")
        for (let i = 0; i < this.list.length; i++){
          // console.log("i :",this.list[i].fields['username'])
          let user={id:0,username:"",status:"offline", login:false}
          if(this.currentUser.id != this.list[i].pk){
           user.id = this.list[i].pk;
           user.username = this.list[i].fields['username'];
           this.users.push(user)
         }
        }
      }


       console.log('my list:',this.users)
      //  this.incomeMessages()
    },error=>{
      console.log('error:',error)
    })
  }

  get_msgs(){
    let current = this.inbox.length
    console.log("now inbox = ", current)
    this.msg_list=[]
    this.handler.get_messages().subscribe(data=>{
      console.log("server msgs :", data)
      this.msg_list = data
      if(this.msg_list.length>current){
        this.inbox = []
        for(let i=0; i<this.msg_list.length;i++){
          let msg = {from:0,to:0,content:''}
          msg.from = this.msg_list[i].fields['msg_from'];
          msg.to = this.msg_list[i].fields['msg_to'];
          msg.content = this.msg_list[i].fields['content'];
          this.inbox.push(msg)
        }
      }
    },error=>{
      console.log("server msgs errors :", error)
    })
  }

  send(msg: HTMLInputElement) {

    console.log(msg.value)
    this.notify.sendMessage(this.currentUser.id+"/"+msg.value+"/"+this.currentFriend.id)
    msg.value=null;

  }
  chatHundler(){
    this.msgs=[]

    for(let i=0;i<this.inbox.length;i++){
      console.log("firend :",this.currentFriend.id, "msg from :",this.inbox[i].from, "msg to :",this.inbox[i].to)
      if(this.currentFriend.id == this.inbox[i].from ||this.currentFriend.id == this.inbox[i].to ){
        this.msgs.push(this.inbox[i])
      }
    }
  console.log("chat :",this.msgs)
  }

}
