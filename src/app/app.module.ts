import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { CharactersPage } from '../pages/characters/characters';
import { SummaryPage } from '../pages/profile/summary/summary';
import { CharacterPage } from '../pages/profile/character/character';
import { TalentsPage } from '../pages/profile/talents/talents';
import { TabsPage } from '../pages/tabs/tabs';

import { GearTooltipPage } from '../modals/gear-tooltip/gear-tooltip';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ProfileButton } from '../components/profile-button/profile-button';
import { ErrorMessageComponent } from '../components/error/error';
import { NavbarComponent } from '../components/navbar/navbar';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CharactersPage,
    SummaryPage,
    CharacterPage,
    TalentsPage,
    TabsPage,
    GearTooltipPage,
    ProfileButton,
    ErrorMessageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CharactersPage,
    SummaryPage,
    CharacterPage,
    TalentsPage,
    TabsPage,
    GearTooltipPage,
    ProfileButton,
    ErrorMessageComponent,
    NavbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    ErrorMessageComponent,
    NavbarComponent
  ]
})
export class AppModule {}
