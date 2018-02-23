import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ArmoryService } from '../../app/services/armory.service';
import { SummaryPage } from '../profile/summary/summary';
import * as _ from 'lodash';

@Component({
    selector: 'characters',
    templateUrl: 'characters.html'
})
export class CharactersPage {
    error: Object;
    realms: any;
    characters: any;

    constructor(
        public navCtrl: NavController,
        private armoryService: ArmoryService,
        private menu: MenuController
    ) {
        this.menu.swipeEnable(false);
    }

    ngOnInit() {
        this.getCharacters();
    }

    getCharacters() {
        this.error = undefined;

        this.armoryService.getCharacters().subscribe(val => {
            this.realms = _.sortBy(_.uniqBy(val['characters'], 'realm'), 'realm');

            for (var character in val['characters']) {
                if (val['characters'][character]) {
                    val['characters'][character]['class'] = this.armoryService.getClassById(val['characters'][character]['class']);
                }
            }
            this.characters = _.sortBy(val['characters'], 'realm');
        }, err => {
            this.error = { code: err.error.code, detail: err.error.detail };
        });
    }

    toggleSection(i) {
        this.realms[i].open = !this.realms[i].open;
    }

    chooseCharacter(realm, name) {
        localStorage.setItem('realm', realm);
        localStorage.setItem('name', name);

        this.navCtrl.push(SummaryPage, {
            realm: realm, name: name
        });
    }
}