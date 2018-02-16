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
        
        this.armoryService.getCharacterData(this.realm, this.name, 'guild,items,stats,talents,titles').then(val => {
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

            this.armoryService.getResourcesData('talents').then(talents => {
                this.stats.resources = { 'talents': talents[val['classId']] };
                
                let talentArray = [];

                for (let talentRow in talents[val['classId']]['talents']) { //  row
                    talentArray[talentRow] = [];
                    
                    LoopTalent:
                    for (let talent in talents[val['classId']]['talents'][talentRow]) { //  column
                        for (let specTalent in talents[val['classId']]['talents'][talentRow][talent]) { //  talent

                            if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {
                                if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']['name'] == this.stats.spec) {

                                    var found = null;
                                    for (let talentArrayRow in talentArray[talentRow]) {
                                        if (talentArray[talentRow][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[talentRow][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                            talentArray[talentRow][talentArrayRow] = talents[val['classId']]['talents'][talentRow][talent][specTalent];
                                            found = true;
                                            break;
                                        }
                                    }

                                    if (found) {
                                        continue LoopTalent;
                                    }
                                    else {
                                        talentArray[talentRow].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]); 
                                    }
                                }
                            }

                            else if (!talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {

                                var found = null;
                                for (let talentArrayRow in talentArray[talentRow]) {
                                    if (talentArray[talentRow][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[talentRow][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found) {
                                    talentArray[talentRow].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]);
                                }
                            }
                        }
                    }
                }
                this.stats.allTalents = talentArray;
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
