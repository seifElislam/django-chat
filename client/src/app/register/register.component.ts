import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   model: any = {};

  constructor(
    private auth:AuthService,

    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.create(this.model)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error.json().error);
          console.log(error)
        });
  }

}
