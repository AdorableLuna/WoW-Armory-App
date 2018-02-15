import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';

@Component({
  selector: 'summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
    error: Object;
    realm: string;
    name: string;
    stats: any;
    characterStats: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private armoryService: ArmoryService
    ) {
        this.realm = navParams.get('realm');
        this.name = navParams.get('name');
        this.getData();
    }

    getData() {
        this.error = undefined;
        
        this.armoryService.getCharacterData(this.realm, this.name, 'guild,items,stats,titles').then(val => {
            this.stats = val;

            this.characterStats = [
                { type: "health", value: val['stats']['health'] },
                { type: val['stats']['powerType'], value: val['stats']['power'] },
                { type: this.filterStat(), value: val['stats'][this.mainstat()] },
                { type: "stamina", value: val['stats']['sta'] },
                { type: "critical-strike", value: val['stats']['crit'].toFixed(0) + '%' },
                { type: "haste", value: val['stats']['haste'].toFixed(0) + '%' },
                { type: "mastery", value: val['stats']['mastery'].toFixed(0) + '%' },
                { type: "versatility", value: val['stats']['versatilityDamageDoneBonus'].toFixed(0) + '%' }
            ];

            this.armoryService.getResourcesData('talents').then(talent => {
                this.stats.resources = { 'talents': talent[val['classId']] };
            }, err => {
                this.error = { code: err.error.code, detail: err.error.detail };
            });

            localStorage.setItem('character_data', JSON.stringify(val));
        }, err => {
            this.error = { code: err.error.code, detail: err.error.detail };
        });
    }

    mainstat() {
        switch(this.stats['class']) {
            case 'Warrior':
                return 'str';
            case 'Paladin':
                if (this.stats['spec'] == 'Holy')
                {
                    return 'int';
                }
                else
                {
                    return 'str';
                }
            case 'Hunter':
                return 'agi';
            case 'Rogue':
                return 'agi';
            case 'Priest':
                return 'int';
            case 'Death Knight':
                return 'str';
            case 'Shaman':
                if (this.stats['spec'] == 'Enhancement')
                {
                    return 'agi';
                }
                else
                {
                    return 'int';
                }
            case 'Mage':
                return 'int';
            case 'Warlock':
                return 'int';
            case 'Monk':
                if (this.stats['spec'] == 'Mistweaver')
                {
                    return 'int';
                }
                else
                {
                    return 'agi';
                }
            case 'Druid':
                if (this.stats['spec'] == 'Guardian' || this.stats['spec'] == 'Feral')
                {
                    return 'agi';
                }
                else
                {
                    return 'int';
                }
            case 'Demon Hunter':
                return 'agi';
        }
    }

    filterStat() {
        switch(this.mainstat()) {
            case 'str':
                return 'strength';
            case 'agi':
                return 'agility';
            case 'int':
                return 'intellect';
        }
    }
}
