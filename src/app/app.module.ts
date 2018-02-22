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
import { CollectionsPage } from './../pages/profile/collections/collections';

import { GearTooltipPage } from '../modals/gear-tooltip/gear-tooltip';
import { TalentTooltipPage } from './../modals/talent-tooltip/talent-tooltip';
import { CollectionTooltipPage } from './../modals/collection-tooltip/collection-tooltip';

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
    CollectionsPage,
    GearTooltipPage,
    TalentTooltipPage,
    CollectionTooltipPage,
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
    CollectionsPage,
    GearTooltipPage,
    TalentTooltipPage,
    CollectionTooltipPage,
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
