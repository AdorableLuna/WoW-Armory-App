import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ProfileButton } from '../../components/profile-button/profile-button';

import { Navbar } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {
  @ViewChild(Navbar) navbar: Navbar;

  @Input() hideBackButton: boolean;
  @Input() profilebtn: boolean;
  @Input() menu: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myApp: MyApp
  ) {
      
  }

  ngOnInit() {
    this.setBackButtonAction()
  }

  setBackButtonAction(){
    this.navbar.backButtonClick = () => {
      this.navCtrl.pop()
      this.myApp.getActive(this.navParams.get('previousPage'));
    }
  }
}
