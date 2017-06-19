import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AppSettings} from '../app.settings';
import { NotifyService } from './notify.service'

@Injectable()
export class ChatHandlerService {

  constructor(private http: Http) { }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'token ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }

  get_users(){
    return this.http.get(AppSettings.API_ENDPOINT + '/api/users/',this.jwt() )
        .map((response: Response) => {
            // let user = response.json();
            // if (user && user.token) {
            //   localStorage.setItem('currentUser', JSON.stringify(user));
            //   window.location.replace("/home");
            //
            // }
            console.log(response.json())
        });
  }

}
