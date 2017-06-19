import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AppSettings} from '../app.settings';
import { NotifyService } from './notify.service'
@Injectable()
export class AuthService {

  constructor(private http: Http, private notify:NotifyService) { }

  login(username: string, password: string) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.API_ENDPOINT + '/api/login/', { username:username, password:password } )
        .map((response: Response) => {
            let user = response.json();
            if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              window.location.replace("/home");

            }
            console.log(response.json())
        });
}

logout() {
    if (this.getCurrentUser() != null)
    {
      let obj =  {user_id : this.getCurrentUser()._id};
      // this.notifyService.sendLogoutMessage(obj);
      localStorage.removeItem('currentUser');
      window.location.replace('/login');
    }
    this.notify.closeChannel()
}

create(user: any) {
  return this.http.post(AppSettings.API_ENDPOINT + '/api/register/', { username:user.username, password:user.password, email:user.email })
  .map((response: Response) => {
    let result = response.json()
    console.log(result)
  });
}


getCurrentUser(){
  return JSON.parse(localStorage.getItem('currentUser'));
}

isLoggedIn(){
  return (this.getCurrentUser()) ? true : false;
}

}
