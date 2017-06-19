import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import {URLSearchParams, Headers, RequestOptions, Http} from "@angular/http";

import {AppSettings} from '../app.settings';

@Injectable()
export class NotifyService {

  private url = AppSettings.API_ENDPOINT + '/chat/';
 private socket;


  constructor(private http: Http) {}

startChannel(){
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser){
    console.log(currentUser.id)
     this.socket = new $WebSocket("ws://127.0.0.1:8000/chat/"+currentUser.id,null,null);
    }
}

sendMessage(msg:any){

  this.socket.send(msg).subscribe(
        (msg)=> {
            console.log("next", msg.data);
        },
        (msg)=> {
            console.log("error", msg);
        },
        ()=> {
            console.log("complete");
        }
    );

  //   this.socket.send(msg, WebSocketSendMode.Promise).then(
  //     (T) => {
  //         console.log("is send :",T);
  //     },
  //     (T) => {
  //         console.log("not send:",T);
  //     }
  //
  //
  // );

}

reciveMessage(){

  this.socket.getDataStream().subscribe(
  (msg)=> {
      console.log("next", msg.data);
      // this.socket.close(false);
  },
  (msg)=> {
      console.log("error", msg);
  },
  ()=> {
      console.log("complete");
  }
);

// this.socket.onMessage(
//   (msg: MessageEvent)=> {
//     console.log(msg)
//     let  result = JSON.parse(msg.data)
//       console.log("onMessage ", JSON.parse(msg.data));
//       if (result.is_logged_in){
//         console.log("okkk")
//       }
//       else{console.log("noo")}
//
//   },
//   // {autoApply: false}
// );


}

closeChannel(){
  this.socket.close(true);
  console.log("close channel")
}
}
