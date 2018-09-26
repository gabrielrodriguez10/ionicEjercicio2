import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];
  constructor(public navCtrl: NavController, public UserServiceProvider: UserServiceProvider) {

  }

  ionViewDidLoad(){
    this.UserServiceProvider.get('https://randomuser.me/api/?results=25')
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }
}
