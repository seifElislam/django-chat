import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { ChatHandlerService } from '../services/chat-handler.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private notify:NotifyService, private handler:ChatHandlerService)
  {
      this.notify.startChannel()
      this.notify.sendMessage('hello world')
      this.notify.reciveMessage()

   }

  ngOnInit() {

    this.handler.get_users()
  }

}
