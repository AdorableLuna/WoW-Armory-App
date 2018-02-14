import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { CharactersPage } from '../pages/characters/characters';
import { SummaryPage } from '../pages/profile/summary/summary';
import { CharacterPage } from '../pages/profile/character/character';
import { TalentsPage } from '../pages/profile/talents/talents';

import { ArmoryService } from './services/armory.service';

@Component({
  templateUrl: 'app.html',
  providers: [ArmoryService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = CharactersPage;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.pages = [
        { title: 'Summary', component: SummaryPage },
        { title: 'Gear', component: CharacterPage },
        { title: 'Talents', component: TalentsPage },
        { title: 'Achievements', component: CharacterPage },
        { title: 'Collections', component: CharacterPage },
        { title: 'Raid Progression', component: CharacterPage },
        { title: 'Player vs Player', component: CharacterPage },
        { title: 'Reputation', component: CharacterPage }
      ]

      this.activePage = this.pages[0];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component, {
      realm: localStorage.getItem('realm'), name: localStorage.getItem('name')
    });
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
