import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

returnUrl: string;
model: any = {};
  constructor(
    private auth:AuthService,
    private notify:NotifyService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
  }
  login() {

  this.auth.login(this.model.username, this.model.password)
    .subscribe(
      data => {
        // this.router.navigate([this.returnUrl]);
        // let obj = {user_id : this.auth.getCurrentUser()._id};
        // this.notify.sendLoginMessage(obj);
      },
      error => {

      });
  console.log("login")
}

}
