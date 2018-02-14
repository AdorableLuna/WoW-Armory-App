import { Component } from '@angular/core';
import { App, NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/Rx'

import { CharactersPage } from '../characters/characters';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {

    constructor(
        public navCtrl: NavController,
        private appCtrl: App,
        private platform: Platform,
        private iab: InAppBrowser,
        private http: HttpClient,
        private splashScreen: SplashScreen
    ) {

    }

    ngOnInit() {
        this.http.get("https://eu.battle.net/oauth/check_token?token=" + localStorage.getItem('access_token'))
            .subscribe(data => {
                this.splashScreen.hide();
                this.appCtrl.getRootNavs()[0].setRoot(CharactersPage);
            }, err => {
                if(localStorage.getItem('access_token') === null)
                {
                    localStorage.removeItem('access_token');
                }
                this.splashScreen.hide();
            });
    }

    public login() {
        this.platform.ready().then(() => {
            this.battlenetLogin().then(success => {
                this.appCtrl.getRootNavs()[0].setRoot(CharactersPage);
            }, (error) => {

            });
        });
    }

    public battlenetLogin() {
        return new Promise((resolve, reject) => {
            var browserRef = this.iab.create("https://eu.battle.net/oauth/authorize?client_id=e4yc2z5sh6fbqbst26yxpvt73yek569m&redirect_uri=https://localhost&response_type=code&scope=wow.profile", "_blank", "location=no");
            browserRef.on("loadstart").subscribe(event => {
                if ((event.url).indexOf("https://localhost") === 0) {
                    browserRef.close();
                    let authcode = event.url.split('?code=');

                    let body = 'grant_type=authorization_code&redirect_uri=https://localhost&scope=wow.profile&code=' + authcode[1];

                    let options = {
                        headers: new HttpHeaders()
                            .set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', 'Basic ' + btoa('e4yc2z5sh6fbqbst26yxpvt73yek569m' + ':' + 'vdbmpXbwxMdBBkcwfm9HHy9Purv9m5yt'))
                    };

                    this.http.post("https://eu.battle.net/oauth/token", body, options)
                        .subscribe(data => {
                            localStorage.setItem('access_token', data['access_token']);
                        }, err => {
                            reject('Problem authenticating with Battlenet. Try again later.')
                        });

                    resolve();
                }
            });
            browserRef.on("exit").subscribe(event => {
                reject();
            });
        });
    }

}