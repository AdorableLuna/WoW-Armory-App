import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

 @Component({
     selector: 'profile-button',
     templateUrl: 'profile-button.html'
 })
 export class ProfileButton {

     constructor(
         public navCtrl: NavController
     ) {
     }

     characterList() {
         this.navCtrl.popToRoot();
     }
 }
