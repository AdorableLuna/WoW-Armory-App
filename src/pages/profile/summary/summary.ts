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
        
        this.armoryService.getCharacterData(this.realm, this.name, 'guild,items,mounts,pets,petSlots,stats,talents,titles').then(val => {
            this.stats = val;
            this.stats.talents = val['talents'].filter(spec => spec['spec']);

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
                let talentArray = [];

                for (let spec in talents[val['classId']]['specs']) { //  specs
                    talentArray[spec] = [];
                    talentArray[spec]['name'] = talents[val['classId']]['specs'][spec]['name'];

                    for (let talentRow in talents[val['classId']]['talents']) { //  row
                        talentArray[spec][talentRow] = [];
                        
                        LoopTalent:
                        for (let talent in talents[val['classId']]['talents'][talentRow]) { //  column
                            for (let specTalent in talents[val['classId']]['talents'][talentRow][talent]) { //  talent
    
                                if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {
                                    if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']['name'] == talentArray[spec]['name']) {
    
                                        var found = null;
                                        for (let talentArrayRow in talentArray[spec][talentRow]) {
                                            if (talentArray[spec][talentRow][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[spec][talentRow][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                                talentArray[spec][talentRow][talentArrayRow] = talents[val['classId']]['talents'][talentRow][talent][specTalent];
                                                found = true;
                                                break;
                                            }
                                        }
    
                                        if (found) {
                                            continue LoopTalent;
                                        }
                                        else {
                                            talentArray[spec][talentRow].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]); 
                                        }
                                    }
                                }
    
                                else if (!talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {
    
                                    var found = null;
                                    for (let talentArrayRow in talentArray[spec][talentRow]) {
                                        if (talentArray[spec][talentRow][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[spec][talentRow][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                            found = true;
                                            break;
                                        }
                                    }
    
                                    if (!found) {
                                        talentArray[spec][talentRow].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]);
                                    }
                                }
                            }
                        }
                    }
                }
                this.stats.allTalents = talentArray;
                localStorage.setItem('character_data', JSON.stringify(val));
            }, err => {
                this.error = { code: err.error.code, detail: err.error.detail };
            });

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
